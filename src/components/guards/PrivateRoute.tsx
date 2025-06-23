// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated",isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
