import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { RoutePaths } from '../static/RoutePaths';

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate(RoutePaths.WELCOME);
    }

    return (
        userData ? (
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
