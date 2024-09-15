// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, token }) => {
  console.log(token);
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
