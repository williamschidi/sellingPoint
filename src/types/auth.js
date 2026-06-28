/**
 * @typedef {'guest' | 'buyer' | 'agent'} UserRole
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {UserRole} role
 */

/**
 * @typedef {Object} AuthResult
 * @property {boolean} ok
 * @property {AuthUser} [user]
 * @property {string} [error]
 * @property {'not_connected' | 'invalid_credentials' | 'validation'} [code]
 */

/**
 * @typedef {Object} SignInCredentials
 * @property {string} email
 * @property {string} password
 */

export {};
