import { Icon } from "@iconify/react";

export const INSPECTION_CALENDAR_CLASS_NAMES = {
  months: "w-full",
  month: "w-full",
  month_grid: "w-full border-collapse",
  month_caption: "relative flex items-center justify-center mb-6",
  caption_label: "text-sm font-medium text-gray-600",
  nav: "absolute inset-x-0 top-0 flex items-center justify-between",
  weekdays: "grid grid-cols-7 mb-2",
  weekday: "flex h-10 items-center justify-center text-xs font-medium text-gray-500",
  week: "grid grid-cols-7",
  day: "flex items-center justify-center p-0",
  day_button:
    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors",
  selected: "[&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary",
  outside: "[&>button]:text-gray-300",
  disabled: "[&>button]:text-gray-300",
};

export const INSPECTION_CALENDAR_STYLES = {
  month_caption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
    fontSize: "20px",
    fontWeight: 600,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 0,
  },
};

export const INSPECTION_CALENDAR_COMPONENTS = {
  PreviousMonthButton: (props) => (
    <button
      {...props}
      type="button"
      aria-label="Previous month"
      className="focus-ring flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-white hover:bg-surface-muted"
    >
      <Icon icon="mdi:chevron-left" className="text-lg" aria-hidden />
    </button>
  ),
  NextMonthButton: (props) => (
    <button
      {...props}
      type="button"
      aria-label="Next month"
      className="focus-ring flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-white hover:bg-surface-muted"
    >
      <Icon icon="mdi:chevron-right" className="text-lg" aria-hidden />
    </button>
  ),
};
