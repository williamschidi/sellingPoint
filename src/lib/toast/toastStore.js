/** External toast store — updates do not re-render React context subscribers. */

const TOAST_DURATION_MS = 3200;

let toast = null;
let timeoutId = null;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToToast(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToastSnapshot() {
  return toast;
}

export function showToast(message, variant = "success") {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }

  toast = { message, variant, id: crypto.randomUUID() };
  notify();

  timeoutId = window.setTimeout(() => {
    toast = null;
    timeoutId = null;
    notify();
  }, TOAST_DURATION_MS);
}
