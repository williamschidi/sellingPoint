import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useFocusTrap } from "../../../hooks/useFocusTrap";

export default function DashboardConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  reasonLabel,
  reasonPlaceholder,
  reasonValue = "",
  onReasonChange,
  reasonOptional = true,
  onConfirm,
  onCancel,
}) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="dashboard-modal-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dashboard-confirm-title"
        aria-describedby="dashboard-confirm-message"
        className="dashboard-modal-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="dashboard-confirm-title" className="text-lg font-bold text-[#111827]">
          {title}
        </h2>
        <p id="dashboard-confirm-message" className="mt-2 text-sm text-[#6b7280]">
          {message}
        </p>
        {reasonLabel && onReasonChange && (
          <div className="mt-4">
            <label className="dashboard-form-label" htmlFor="dashboard-confirm-reason">
              {reasonLabel}
              {reasonOptional ? " (optional)" : " *"}
            </label>
            <textarea
              id="dashboard-confirm-reason"
              rows={3}
              value={reasonValue}
              onChange={(event) => onReasonChange(event.target.value)}
              placeholder={reasonPlaceholder}
              className="dashboard-form-input dashboard-form-textarea"
            />
          </div>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="dashboard-form-btn-ghost">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              tone === "danger"
                ? "inline-flex h-9 items-center rounded-[10px] bg-danger px-3.5 text-xs font-medium text-white"
                : "dashboard-form-btn-primary"
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DashboardModal({ open, title, children, onClose }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dashboard-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-modal-title"
        className="dashboard-modal-panel max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="dashboard-modal-title" className="text-lg font-bold text-[#111827]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="dashboard-btn-icon shrink-0"
            aria-label="Close dialog"
          >
            <Icon icon="lucide:x" className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
