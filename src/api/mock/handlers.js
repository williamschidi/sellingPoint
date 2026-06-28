import {
  getMockPropertyById,
  mockBookedSlots,
  mockDelay,
  mockInspectionRequests,
  mockProperties,
  mockTimeSlots,
} from "./data.js";
import { createInspectionReferenceId } from "../../lib/bookInspection/reference.js";
import {
  getBookedSlotsFromStorage,
  loadInspectionRequests,
  saveInspectionRequest,
} from "../../lib/storage/inspectionStorage.js";
import { searchPropertiesCatalog } from "../../lib/properties/filterProperties.js";
import { AGENT_DASHBOARD_SEED_REQUESTS } from "../../lib/dashboard/seedRequests.js";

export async function mockGetProperties() {
  await mockDelay();
  return mockProperties;
}

export async function mockGetPropertyById(propertyId) {
  await mockDelay();
  return getMockPropertyById(propertyId);
}

export async function mockSearchProperties(filters = {}) {
  await mockDelay();
  return searchPropertiesCatalog(mockProperties, filters);
}

export async function mockGetBookedSlots(propertyId) {
  await mockDelay();

  const seeded = mockBookedSlots.filter((slot) => slot.propertyId === propertyId);
  const stored = getBookedSlotsFromStorage(propertyId);

  const merged = [...seeded];
  for (const slot of stored) {
    const exists = merged.some(
      (item) => item.date === slot.date && item.time === slot.time
    );
    if (!exists) merged.push(slot);
  }

  return merged;
}

export async function mockGetTimeSlots() {
  await mockDelay();
  return mockTimeSlots;
}

export async function mockCreateInspectionRequest(payload) {
  await mockDelay();

  const record = {
    id: createInspectionReferenceId(),
    ...payload,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  mockInspectionRequests.unshift(record);
  saveInspectionRequest(record);

  const booked = mockBookedSlots.find(
    (slot) =>
      slot.propertyId === payload.propertyId &&
      slot.date === payload.date &&
      slot.time === payload.time
  );

  if (!booked) {
    mockBookedSlots.push({
      propertyId: payload.propertyId,
      date: payload.date,
      time: payload.time,
    });
  }

  return record;
}

export async function mockListInspectionRequests() {
  await mockDelay();
  const stored = loadInspectionRequests();
  if (stored.length > 0) {
    return stored;
  }
  return AGENT_DASHBOARD_SEED_REQUESTS;
}
