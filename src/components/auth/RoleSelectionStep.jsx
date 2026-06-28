import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { ROLE_AGENT, ROLE_BUYER } from "../../lib/auth/constants.js";

const ROLE_OPTIONS = [
  {
    id: ROLE_AGENT,
    title: "Continue as an Agent",
    description:
      "List properties, manage bookings, and access the agent dashboard.",
    icon: "lucide:briefcase",
  },
  {
    id: ROLE_BUYER,
    title: "Continue as a Buyer / User",
    description:
      "Save properties, book inspections, and track your viewing requests.",
    icon: "lucide:user-round",
  },
];

export default function RoleSelectionStep({ selectedRole, onSelect, onBackHref = "/" }) {
  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="mb-10 text-center">
        <div className="bg-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-md">
          <Icon icon="lucide:shield-check" className="text-2xl text-white" aria-hidden />
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-slate-900">
          How would you like to continue?
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Choose your role before signing in or creating an account. You can switch
          between sign in and sign up on the next step.
        </p>
      </div>

      <div className="surface-panel-elevated space-y-3 p-6 lg:p-8">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = selectedRole === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-primary bg-primary-subtle shadow-sm"
                  : "border-slate-200 bg-white hover:border-primary/30 hover:bg-slate-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon icon={option.icon} className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  {option.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-500">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}

        <Link to={onBackHref} className="btn-ghost mt-2 w-full">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
