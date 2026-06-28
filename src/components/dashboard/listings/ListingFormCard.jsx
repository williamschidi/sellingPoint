export default function ListingFormCard({ title, children }) {
  return (
    <section className="dashboard-form-card">
      <h2 className="dashboard-form-card-title">{title}</h2>
      {children}
    </section>
  );
}
