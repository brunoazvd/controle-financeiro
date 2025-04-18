import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async(_, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        if (!token) return rejectWithValue("Token não encontrado.");
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.get("/auth/verify");
            return { token };
        } catch (error) {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            return rejectWithValue(error.response?.data?.message || "Falha na verificação do token.");
        }
    }
)

const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({username, password}, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/login", { username, password });
            const token = res.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return { token };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Falha no login.");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({username, password}, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/register", { username, password });
            const token = res.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return { token };
        } catch(error) {
            return rejectWithValue(error.response?.data?.message || "Falha no registro.");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: token ? { token } : null,
        error: null,
        loading: true,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;