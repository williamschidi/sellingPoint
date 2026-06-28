/**
 * Page layout wrapper — use inside Layout's single <main> landmark (do not nest <main>).
 */
export default function PageShell({
  variant = "padded",
  className = "",
  children,
}) {
  const baseClass =
    variant === "padded" ? "page-shell-padded" : variant === "full" ? "page-shell" : "";

  return <div className={`${baseClass} ${className}`.trim()}>{children}</div>;
}
