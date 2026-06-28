import { Link } from "react-router-dom";

export default function ListingsFormHeader({ onSaveDraft, onSubmit }) {
  return (
    <div className="dashboard-listings-header hidden lg:flex">
      <Link to="/dashboard" className="text-[13px] text-[#6b7280] no-underline hover:text-[#111827]">
        ← My Listings
      </Link>
      <span className="text-[#e5e7eb]" aria-hidden>
        /
      </span>
      <h1 className="text-base font-bold text-[#111827]">Add New Listing</h1>

      <div className="ml-auto flex items-center gap-2.5">
        <button
          type="button"
          onClick={onSaveDraft}
          className="dashboard-form-btn-ghost"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="dashboard-form-btn-primary"
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
}
