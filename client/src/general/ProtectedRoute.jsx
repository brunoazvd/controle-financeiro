import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading.jsx";
import { RoutePaths } from "../static/RoutePaths.js";

export const ProtectedRoute = ({children}) => {
    const { userData, loading } = useSelector((state) => state.user);

    if (loading) {
        return <Loading name="auth"/>
    }

    if (!userData) {
        return <Navigate to={RoutePaths.WELCOME} replace/>
    }

    return children;
}