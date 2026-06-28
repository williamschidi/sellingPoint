const STORAGE_KEY = "sellingpoint:inspection-requests";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function loadInspectionRequests() {
  return readAll();
}

export function saveInspectionRequest(record) {
  const records = readAll();
  records.unshift(record);
  writeAll(records);
  return record;
}

export function getInspectionRequestsForProperty(propertyId) {
  return readAll().filter((record) => record.propertyId === propertyId);
}

export function getBookedSlotsFromStorage(propertyId) {
  return readAll()
    .filter(
      (record) =>
        record.propertyId === propertyId && record.status !== "cancelled"
    )
    .map((record) => ({
      propertyId: record.propertyId,
      date: record.date,
      time: record.time,
    }));
}
