import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading.jsx";
import { RoutePaths } from "../static/RoutePaths.js";

export const ProtectedRoute = ({children}) => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Loading name="auth"/>
    }

    if (!user) {
        return <Navigate to={RoutePaths.WELCOME} replace/>
    }

    return children;
}