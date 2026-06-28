/**
 * Generates a client-side inspection reference ID.
 * TODO: Replace with server-assigned reference from POST /inspection-requests response.
 */
export function createInspectionReferenceId() {
  const segment = crypto.randomUUID().split("-")[0].toUpperCase();
  return `SP-IR-${segment}`;
}
