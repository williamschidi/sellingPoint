import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../common/PageLoader";
import { AGENT_ACCESS_DENIED_MESSAGE } from "../../lib/auth/authFlow.js";
import { useAuth } from "../../context/AuthContext";

/**
 * Simulates agent-only route protection for the dashboard.
 * TODO: Replace role check with backend RBAC when auth middleware is connected.
 */
export default function AgentRoute({ children, redirectTo = "/sign-in" }) {
  const { status, isAuthenticated, user, authAvailable } = useAuth();
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
        state={{
          from: location.pathname,
          reason: "agent_auth_required",
        }}
      />
    );
  }

  if (user?.role !== "agent") {
    return (
      <Navigate
        to="/"
        replace
        state={{
          reason: "agent_only",
          message: AGENT_ACCESS_DENIED_MESSAGE,
        }}
      />
    );
  }

  return children;
}
