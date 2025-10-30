
import { Navigate, Outlet } from "react-router-dom";
import { getAccessVendorToken } from "../utils/vendor-utils";

const VendorPrivateRoute = () => {
  const token = getAccessVendorToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default VendorPrivateRoute;

