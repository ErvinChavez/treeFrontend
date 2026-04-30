export default function ServiceCard({ service }) {
  return (
    <div className="card card-interactive space-y-1">
      <h2 className="text-title">{service.name}</h2>
      <p className="text-muted">{service.description}</p>
    </div>
  );
}