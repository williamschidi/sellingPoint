/**
 * Inspection booking API facade.
 * When USE_MOCK_DATA is false, posts to /inspections via apiRequest.
 * @see src/api/README.md
 */
import { USE_MOCK_DATA } from "../config.js";
import { apiRequest } from "../client.js";
import {
  mockCreateInspectionRequest,
  mockGetBookedSlots,
  mockGetTimeSlots,
  mockListInspectionRequests,
} from "../mock/handlers.js";

/** @typedef {import('../../types/inspection.js').InspectionRequestPayload} InspectionRequestPayload */
/** @typedef {import('../../types/inspection.js').InspectionRequest} InspectionRequest */

export async function getTimeSlots() {
  if (USE_MOCK_DATA) {
    return mockGetTimeSlots();
  }

  return apiRequest("/inspections/time-slots");
}

export async function getBookedSlots(propertyId) {
  if (USE_MOCK_DATA) {
    return mockGetBookedSlots(propertyId);
  }

  return apiRequest(`/properties/${propertyId}/inspection-slots`);
}

/**
 * TODO: Backend POST /inspection-requests — persist and notify agent server-side.
 * @param {InspectionRequestPayload} payload
 * @returns {Promise<InspectionRequest>}
 */
export async function createInspectionRequest(payload) {
  if (USE_MOCK_DATA) {
    return mockCreateInspectionRequest(payload);
  }

  return apiRequest("/inspection-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * TODO: Backend GET /inspection-requests — user booking history (requires auth).
 * @returns {Promise<InspectionRequest[]>}
 */
export async function listInspectionRequests() {
  if (USE_MOCK_DATA) {
    return mockListInspectionRequests();
  }

  return apiRequest("/inspection-requests");
}
