import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("role") === "admin";
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute };
