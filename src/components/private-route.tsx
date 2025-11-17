
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/utils";

const PrivateRoute = () => {
  const token = getAccessToken();
  return token ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default PrivateRoute;

