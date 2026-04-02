export default function ServiceList({ services }) {
    return (
        <div className="mt-2">
            <p className="font-semibold">Services:</p>
            <ul className="list-disc ml-5">
                {services?.map((service) => (
                    <li key={service.id}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
}