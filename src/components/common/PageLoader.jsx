export default function PageLoader({ message = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-sm text-slate-500"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="relative h-10 w-10" aria-hidden>
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
        <div className="absolute inset-1.5 animate-spin rounded-full border-2 border-transparent border-b-secondary [animation-direction:reverse] [animation-duration:1.2s]" />
      </div>
      <p className="font-medium text-slate-600">{message}</p>
    </div>
  );
}
