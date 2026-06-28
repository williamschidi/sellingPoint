/**
 * Runtime API configuration.
 * Set VITE_USE_MOCK_DATA=false when connecting to the backend.
 * @see src/api/README.md
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

/** Set to "false" when your Express + MongoDB backend is ready. */
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false";
