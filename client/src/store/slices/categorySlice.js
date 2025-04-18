import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/api/categories");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Falha ao buscar categorias.");
        }
    }
)

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        error: null,
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
})

export default categorySlice.reducer;