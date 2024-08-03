import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BusinessGuard(Component) {
  return function useBusinessGuard(props) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role !== "business") {
      return (
        <div>
          <span>
            You are not allowed to view this page <Link to="/">Back home</Link>
          </span>
        </div>
      );
    }
    return <Component {...props} />;
  };
}
