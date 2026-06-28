import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Restricts agent-only routes.
 * TODO: Check user.role === 'agent' when backend RBAC is connected.
 */
export default function AgentRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: location.pathname, reason: "agent_auth_required" }}
      />
    );
  }

  return children;
}
