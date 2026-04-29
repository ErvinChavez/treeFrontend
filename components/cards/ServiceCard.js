export default function ServiceCard({ service }) {
  return (
    <div className="card card-hover">
      <h2 className="text-xl font-semibold text-brand-dark">{service.name}</h2>
      <p className="text-muted mt-1">{service.description}</p>
    </div>
  );
}