function parseTimeTo24Hour(timeLabel) {
  const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 10, minutes: 0 };

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
}

function formatGoogleDate(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

/**
 * Builds a Google Calendar event URL for an inspection.
 * TODO: Backend may send calendar invites via email instead.
 */
export function buildGoogleCalendarUrl({
  title,
  dateKey,
  timeLabel,
  location = "",
  details = "",
}) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const { hours, minutes } = parseTimeTo24Hour(timeLabel);

  const start = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Downloads an .ics file for calendar apps.
 */
export function downloadInspectionIcs({
  title,
  dateKey,
  timeLabel,
  location = "",
  description = "",
  referenceId = "",
}) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const { hours, minutes } = parseTimeTo24Hour(timeLabel);

  const start = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const stamp = formatGoogleDate(new Date()).replace(/[-:]/g, "").slice(0, 15);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SellingPoint//Inspection//EN",
    "BEGIN:VEVENT",
    `UID:${referenceId || crypto.randomUUID()}@sellingpoint`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatGoogleDate(start)}`,
    `DTEND:${formatGoogleDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${referenceId || "inspection"}.ics`;
  anchor.click();
  URL.revokeObjectURL(url);
}
