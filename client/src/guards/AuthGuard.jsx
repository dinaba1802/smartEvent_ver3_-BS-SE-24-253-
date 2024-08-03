import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthGuard(Component) {
  return function useAuthGuard(props) {
    const { user, loading } = useAuth();
    if (loading) return null;

    if (!user) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
}
