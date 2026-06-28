/**
 * @typedef {'verified' | 'pending'} VerificationStatus
 */

/**
 * @typedef {Object} PropertyLocation
 * @property {string} address
 * @property {string} lga
 * @property {string} state
 * @property {number} [lat]
 * @property {number} [lng]
 */

/**
 * @typedef {Object} PropertyAgent
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {string} whatsapp
 * @property {string} agency
 * @property {{ city: string, state: string }} location
 */

/**
 * @typedef {Object} PropertyDocument
 * @property {string} label
 * @property {boolean} available
 * @property {'summary' | 'on-request' | 'verified'} accessLevel
 * @property {string} note
 * @property {string} [documentId] TODO: Backend document reference
 * @property {string} [verifiedAt] TODO: Backend ISO timestamp
 */

/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [furtherDescription]
 * @property {string} price
 * @property {string[]} propertyImages
 * @property {string} [imageFallback]
 * @property {PropertyLocation} location
 * @property {number} landSize
 * @property {string} propertyType
 * @property {VerificationStatus} verificationStatus
 * @property {string} status
 * @property {string} listedAt
 * @property {string[]} features
 * @property {string[]} titleDocument
 * @property {PropertyDocument[]} documents
 * @property {PropertyAgent} agent
 */

export {};
