import { progressStatusLabel } from "../../../lib/dashboard/listingForm.js";

function ProgressRow({ label, percent }) {
  const status = progressStatusLabel(percent);
  const fillColor =
    status.tone === "done"
      ? "var(--color-secondary)"
      : status.tone === "progress"
        ? "var(--color-gold)"
        : "var(--color-secondary)";

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-[#6b7280]">{label}</span>
        <span
          className={`font-semibold ${
            status.tone === "done"
              ? "text-secondary"
              : status.tone === "progress"
                ? "text-gold"
                : "text-[#6b7280]"
          }`}
        >
          {status.text}
        </span>
      </div>
      <div className="dashboard-progress-bar">
        <div
          className="dashboard-progress-fill"
          style={{ width: `${percent}%`, background: fillColor }}
        />
      </div>
    </div>
  );
}

const VERIFICATION_STEPS = [
  {
    step: 1,
    title: "You Submit",
    body: "Complete all fields and submit.",
    color: "bg-primary",
  },
  {
    step: 2,
    title: "Admin Reviews",
    body: "Our team verifies within 24–48hrs.",
    color: "bg-gold",
  },
  {
    step: 3,
    title: "Goes Live",
    body: "Listing published with verified badge.",
    color: "bg-secondary",
  },
];

export default function ListingFormSidebar({
  sections,
  onSaveDraft,
  onSubmit,
}) {
  return (
    <aside className="flex flex-col gap-4 self-start">
      <section className="dashboard-form-card p-5">
        <h3 className="mb-4 text-[13px] font-bold text-[#111827]">Listing Progress</h3>
        <div className="flex flex-col gap-2.5">
          {sections.map((section) => (
            <ProgressRow
              key={section.id}
              label={section.label}
              percent={section.percent}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-form-card p-5">
        <h3 className="mb-3.5 text-[13px] font-bold text-[#111827]">
          Verification Process
        </h3>
        <div className="flex flex-col gap-2.5">
          {VERIFICATION_STEPS.map((item) => (
            <div key={item.step} className="flex items-start gap-2.5">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${item.color}`}
              >
                {item.step}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111827]">{item.title}</p>
                <p className="text-[11px] text-[#6b7280]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-primary/10 bg-primary-light p-[18px]">
        <p className="mb-2.5 text-xs font-bold text-primary">
          💡 Tips for Faster Verification
        </p>
        <ul className="list-disc space-y-0 pl-4 text-xs leading-8 text-primary">
          <li>Upload clear, high-quality photos</li>
          <li>Mention document type (C of O, etc.)</li>
          <li>Include accurate land dimensions</li>
          <li>Add a nearby landmark for location</li>
        </ul>
      </section>

      <button
        type="button"
        onClick={onSubmit}
        className="dashboard-form-btn-primary-lg w-full justify-center"
      >
        Submit for Verification →
      </button>
      <button
        type="button"
        onClick={onSaveDraft}
        className="dashboard-form-btn-ghost-lg w-full justify-center"
      >
        Save as Draft
      </button>
    </aside>
  );
}
