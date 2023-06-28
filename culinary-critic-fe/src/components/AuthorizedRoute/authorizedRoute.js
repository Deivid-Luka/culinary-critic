import { useAppContext } from "../../AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Forbidden403 from "../../pages/Forbidden403/forbidden403";

const AuthorizedRoutes = () => {
  const {
    user: [user],
  } = useAppContext();
  const location = useLocation();

  if (!user && location.pathname !== "/addrestaurant") {
    // User is not logged in, allow access to all routes except "/addrestaurant"
    return <Outlet />;
  } else if (user && user.role === "ROLE_ADMIN") {
    // User is logged in and has admin role, allow access to all routes
    return <Outlet />;
  } else {
    // User is logged in but not an admin, show Forbidden403 page
    return <Navigate to={"/forbidden"} />;
  }
};

export default AuthorizedRoutes;
