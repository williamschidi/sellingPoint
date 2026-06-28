import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../common/PageLoader";
import { useAuth } from "../../context/AuthContext";

/**
 * Guards routes that require authentication once backend auth is connected.
 * When auth is unavailable (mock phase), children render without redirect.
 */
export default function ProtectedRoute({ children, redirectTo = "/sign-in" }) {
  const { status, isAuthenticated, authAvailable } = useAuth();
  const location = useLocation();

  if (!authAvailable) {
    return children;
  }

  if (status === "loading") {
    return <PageLoader message="Checking session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname, reason: "auth_required" }}
      />
    );
  }

  return children;
}
