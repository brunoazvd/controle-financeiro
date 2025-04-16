import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { RoutePaths } from '../static/RoutePaths';

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate(RoutePaths.WELCOME);
    }

    return (
        user ? (
        <div className="bg-amber-400 flex w-full p-4 flex-row items-center justify-between">
            <p className="text-4xl">Website</p>
            <p 
                className="text-xl cursor-pointer hover:font-medium" 
                onClick={handleLogout}>
                Logout
            </p>
        </div>
        ) : (
        <></>
        )
    )
}
