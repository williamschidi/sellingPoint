import { addDays, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import {
  INSPECTION_CALENDAR_CLASS_NAMES,
  INSPECTION_CALENDAR_COMPONENTS,
  INSPECTION_CALENDAR_STYLES,
} from "./InspectionCalendar.config.jsx";

export default function InspectionCalendar({ selectedDate, onSelectDate }) {
  const tomorrow = addDays(startOfDay(new Date()), 1);

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={{ before: tomorrow }}
        showOutsideDays
        fixedWeeks
        classNames={INSPECTION_CALENDAR_CLASS_NAMES}
        components={INSPECTION_CALENDAR_COMPONENTS}
        styles={INSPECTION_CALENDAR_STYLES}
      />
    </div>
  );
}
