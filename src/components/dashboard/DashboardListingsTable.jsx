import { Link } from "react-router-dom";
import {
  formatListingPrice,
  formatListingSubtitle,
  getListingViews,
} from "../../lib/dashboard/formatters.js";

function StatusBadge({ status }) {
  if (status === "verified") {
    return <span className="dashboard-badge-verified">✓ Verified</span>;
  }
  return <span className="dashboard-badge-pending">⏳ Pending</span>;
}

export default function DashboardListingsTable({ properties }) {
  const rows = properties.slice(0, 6);

  return (
    <section className="dashboard-card" aria-labelledby="dashboard-listings-heading">
      <div className="dashboard-card-header">
        <h2 id="dashboard-listings-heading" className="dashboard-card-title">
          My Listings
        </h2>
        <Link to="/properties" className="dashboard-btn-ghost-sm no-underline">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="dashboard-table min-w-full">
          <thead>
            <tr>
              <th>Property</th>
              <th>Price</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((property) => (
              <tr key={property.id}>
                <td>
                  <div className="font-semibold">{property.title}</div>
                  <div className="text-[11px] text-[#6b7280]">
                    {formatListingSubtitle(property)}
                  </div>
                </td>
                <td className="font-semibold text-primary">
                  {formatListingPrice(property)}
                </td>
                <td>
                  <StatusBadge status={property.verificationStatus} />
                </td>
                <td className="font-semibold">{getListingViews(property.id)}</td>
                <td>
                  <Link
                    to={`/propertyDetail/${property.id}`}
                    className="dashboard-tbl-action dashboard-tbl-view no-underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
