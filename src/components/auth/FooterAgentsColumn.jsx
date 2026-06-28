import ListPropertyButton from "./ListPropertyButton.jsx";
import { Link } from "react-router-dom";

const linkClass =
  "text-[13px] text-white/55 transition-colors duration-200 hover:text-accent-mint";

/**
 * Footer agent links aligned with navbar list-property auth flow.
 */
export function FooterAgentsColumn() {
  return (
    <div>
      <p className="mb-5 text-[10px] font-bold tracking-[0.13em] text-white/30 uppercase">
        For Agents
      </p>
      <ul className="flex flex-col gap-2.5">
        <li>
          <ListPropertyButton className={`${linkClass} bg-transparent p-0 text-left`}>
            List a Property
          </ListPropertyButton>
        </li>
        <li>
          <a
            href="mailto:nnaa4good@gmail.com?subject=Agent%20Partnership%20Enquiry"
            className={linkClass}
          >
            Agent Enquiries
          </a>
        </li>
        <li>
          <Link to="/dashboard" className={linkClass}>
            Agent Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}
