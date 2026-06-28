import { Link } from "react-router-dom";

/**
 * Centered full-width status panel for route-level loading gaps, errors, and not-found states.
 */
export default function PageStatus({
  message,
  className = "flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-surface-muted px-4 text-center",
  children,
  ...rest
}) {
  return (
    <div className={className} {...rest}>
      {message && <p className="text-sm text-text-muted">{message}</p>}
      {children}
    </div>
  );
}

export function PageStatusActions({ children }) {
  return <div className="flex flex-wrap justify-center gap-3">{children}</div>;
}

export function PageStatusLink({ to, children, className = "btn-primary" }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export function PageStatusButton({ onClick, children, className = "btn-primary" }) {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
