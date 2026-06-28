import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AGENT_ACCESS_DENIED_MESSAGE } from "../../lib/auth/authFlow.js";
import { useToast } from "../../context/ToastContext";

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

    if (reason === "agent_only") {
      showToast(location.state?.message ?? AGENT_ACCESS_DENIED_MESSAGE, "error");
      lastNoticeRef.current = reason;
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate, showToast]);

  return null;
}
