import { Icon } from "@iconify/react";
import { createContext, useContext, useSyncExternalStore } from "react";
import {
  getToastSnapshot,
  showToast,
  subscribeToToast,
} from "../lib/toast/toastStore";

const ToastContext = createContext(null);

const VARIANTS = {
  success: {
    icon: "lucide:check-circle",
    bar: "bg-slate-900",
  },
  error: {
    icon: "lucide:alert-circle",
    bar: "bg-red-600",
  },
};

function ToastViewport() {
  const toast = useSyncExternalStore(subscribeToToast, getToastSnapshot);

  if (!toast) return null;

  const style = VARIANTS[toast.variant] ?? VARIANTS.success;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 sm:bottom-8"
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
    >
      <div
        className={`animate-[toast-in_0.4s_ease-out] flex max-w-md items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md ${style.bar}`}
      >
        <Icon icon={style.icon} className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToastFn = useContext(ToastContext);
  if (!showToastFn) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return { showToast: showToastFn };
}
