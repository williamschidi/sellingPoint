import { useNavigate } from "react-router-dom";
import { getListPropertyNavigationTarget } from "../../lib/auth/authFlow.js";
import { useAuth } from "../../context/AuthContext.jsx";

/**
 * Centralized handler for the "List property" entry point.
 * Replace navigation targets in authFlow.js when backend auth ships.
 */
export function useListPropertyEntry() {
  const navigate = useNavigate();
  const auth = useAuth();

  return function goToListProperty() {
    if (auth.status === "loading") return;

    const target = getListPropertyNavigationTarget({
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
    });

    if (target.state) {
      navigate(target.to, { state: target.state });
      return;
    }

    navigate(target.to);
  };
}
