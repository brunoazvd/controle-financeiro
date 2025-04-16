import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading.jsx";

export const ProtectedRoute = ({children}) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Loading name="auth"/>
    }

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return children;
}