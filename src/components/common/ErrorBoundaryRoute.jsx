import { useLocation } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

/**
 * Resets the error boundary when the route changes so users can recover
 * without a full page reload.
 */
export default function ErrorBoundaryRoute({ children }) {
  const location = useLocation();

  return (
    <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>
  );
}
