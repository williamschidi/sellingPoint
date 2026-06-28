import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AGENT_DOCUMENT_REQUEST_MAILTO } from "../../lib/properties/constants";

export default function PropertyDocuments({ documents = [], propertyTitle = "" }) {
  if (documents.length === 0) return null;

  const mailtoSubject = encodeURIComponent(
    `Document request — ${propertyTitle}`
  );

  return (
    <section className="mt-5 space-y-4 border-t border-gray-200 pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-bold tracking-wide text-gray-700">
            Title documents
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Document availability is verified at listing level.{" "}
            <Link to="/verification" className="text-primary font-semibold hover:underline">
              Learn how verification works
            </Link>
            .
          </p>
        </div>
        <a
          href={`${AGENT_DOCUMENT_REQUEST_MAILTO}&body=Please%20send%20document%20copies%20for%20${mailtoSubject}`}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-primary"
        >
          <Icon icon="lucide:mail" className="h-4 w-4" aria-hidden />
          Request documents
        </a>
      </div>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.label}
            className={`rounded-xl border px-4 py-3 ${
              doc.available
                ? "border-secondary/20 bg-secondary/5"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon
                icon={doc.available ? "lucide:file-check" : "lucide:file-clock"}
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  doc.available ? "text-secondary" : "text-slate-400"
                }`}
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{doc.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{doc.note}</p>
                {doc.documentId && (
                  <p className="mt-1 text-[11px] text-slate-400">
                    Ref: {doc.documentId}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
