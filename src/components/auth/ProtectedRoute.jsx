import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../common/PageLoader";
import { useAuth } from "../../context/AuthContext";

/**
 * Guards routes that require authentication once backend auth is connected.
 * Mock auth uses the same guard during frontend-only development.
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
