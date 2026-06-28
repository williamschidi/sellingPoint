/**
 * @typedef {Object} InspectionClient
 * @property {string} fullName
 * @property {string} phone
 * @property {string} notes
 */

/**
 * @typedef {Object} InspectionRequestPayload
 * @property {string} propertyId
 * @property {string} date
 * @property {string} time
 * @property {InspectionClient} client
 * @property {boolean} confirmed
 */

/**
 * @typedef {Object} InspectionRequest
 * @property {string} id Reference ID (e.g. SP-IR-abc123)
 * @property {string} propertyId
 * @property {string} date
 * @property {string} time
 * @property {InspectionClient} client
 * @property {boolean} confirmed
 * @property {'pending' | 'confirmed' | 'cancelled'} status
 * @property {string} createdAt
 */

/**
 * @typedef {Object} BookedSlot
 * @property {string} propertyId
 * @property {string} date
 * @property {string} time
 */

export {};
