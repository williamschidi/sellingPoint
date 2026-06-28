export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="focus-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
