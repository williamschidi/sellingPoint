function ClientDetails({
  detailsRef,
  detailsEnabled,
  clientDetails,
  setClientDetails,
  errors,
  setErrors,
}) {
  const { fullName, phone, notes, confirmed } = clientDetails;

  return (
    <section
      ref={detailsRef}
      className={`surface-panel mt-6 p-6 transition-opacity ${
        detailsEnabled ? "opacity-100" : "opacity-60"
      }`}
      aria-labelledby="client-details-heading"
    >
      <h2 id="client-details-heading" className="mb-6 text-base font-semibold text-slate-700">
        Your details and confirm
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block" htmlFor="client-full-name">
          <span className="mb-2 block text-xs font-semibold text-slate-700">Full name</span>
          <input
            id="client-full-name"
            value={fullName}
            disabled={!detailsEnabled}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "client-full-name-error" : undefined}
            onChange={(e) => {
              setClientDetails((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            className={`form-input ${errors.fullName ? "form-input-error" : ""}`}
            placeholder="Enter your name"
          />
          {errors.fullName && (
            <p id="client-full-name-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.fullName}
            </p>
          )}
        </label>

        <label className="block" htmlFor="client-phone">
          <span className="mb-2 block text-xs font-semibold text-slate-700">Phone number</span>
          <input
            id="client-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            disabled={!detailsEnabled}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "client-phone-error" : undefined}
            onChange={(e) => {
              setClientDetails((prev) => ({ ...prev, phone: e.target.value }));
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className={`form-input ${errors.phone ? "form-input-error" : ""}`}
            placeholder="+234..."
          />
          {errors.phone && (
            <p id="client-phone-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.phone}
            </p>
          )}
        </label>
      </div>

      <label className="mt-4 block" htmlFor="client-notes">
        <span className="mb-2 block text-xs font-semibold text-slate-700">Notes</span>
        <textarea
          id="client-notes"
          value={notes}
          disabled={!detailsEnabled}
          onChange={(e) =>
            setClientDetails((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="form-input min-h-28 resize-none py-3"
          placeholder="Add anything the agent should know before the inspection"
        />
      </label>

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          id="client-confirmed"
          type="checkbox"
          checked={confirmed}
          disabled={!detailsEnabled}
          aria-invalid={Boolean(errors.confirmed)}
          aria-describedby={errors.confirmed ? "client-confirmed-error" : undefined}
          onChange={(e) => {
            setClientDetails((prev) => ({ ...prev, confirmed: e.target.checked }));
            setErrors((prev) => ({ ...prev, confirmed: "" }));
          }}
          className="mt-1 h-4 w-4 rounded border-slate-300 accent-primary disabled:cursor-not-allowed"
        />
        <span className="text-sm leading-6 text-text-muted">
          I confirm my details are correct and agree to be contacted by the agent to
          finalize this inspection.
        </span>
      </label>
      {errors.confirmed && (
        <p id="client-confirmed-error" className="mt-2 text-xs text-red-600" role="alert">
          {errors.confirmed}
        </p>
      )}
    </section>
  );
}

export default ClientDetails;
