import Login from "../../pages/Login/login";
import {useAppContext} from "../../AppContext";
import {Navigate, Outlet, Route, useLocation, useNavigate} from "react-router-dom";
import Forbidden403 from "../../pages/Forbidden403/forbidden403";

const AuthorizedRoutes = (props) => {
    const {
        user: [user],
    } = useAppContext();
    return(
        localStorage.getItem('cc-token') !== "" ? <Outlet /> : <Navigate to={"/forbidden"} />
    )
};

export default AuthorizedRoutes;