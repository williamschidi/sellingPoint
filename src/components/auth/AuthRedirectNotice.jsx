import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AGENT_ACCESS_DENIED_MESSAGE } from "../../lib/auth/authFlow.js";
import { useToast } from "../../context/ToastContext";

const REDIRECT_MESSAGES = {
  agent_only: AGENT_ACCESS_DENIED_MESSAGE,
  agent_auth_required:
    "Sign in with an agent account to access the dashboard and list properties.",
  auth_required: "Sign in to continue to that page.",
};

/**
 * Shows one-time notices after auth-related redirects (e.g. buyer blocked from dashboard).
 */
export default function AuthRedirectNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const lastNoticeRef = useRef(null);

  useEffect(() => {
    const reason = location.state?.reason;
    if (!reason || lastNoticeRef.current === reason) return;

    const message = location.state?.message ?? REDIRECT_MESSAGES[reason];
    if (!message) return;

    const variant = reason === "agent_only" ? "error" : "success";
    showToast(message, variant);
    lastNoticeRef.current = reason;

    if (reason === "agent_only") {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate, showToast]);

  return null;
}

export { REDIRECT_MESSAGES };
