export default function ServiceList({ services }) {
    return (
        <div className="section">
            <p className="section-title">Services:</p>
            <ul className="list-disc ml-5 text-sm text-gray-700">
                {services?.map((service) => (
                    <li key={service.id}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
}