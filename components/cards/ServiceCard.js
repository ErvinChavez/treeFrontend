export default function ServiceCard({ service }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{service.name}</h2>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
}