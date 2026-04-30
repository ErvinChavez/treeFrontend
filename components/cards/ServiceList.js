export default function ServiceList({ services }) {
    return (
        <div className="stack-xs">
            <p className="section-title">Services:</p>

            <ul className="space-y-1 text-body">
                {services?.map((service) => (
                    <li key={service.id} className="flex items-center gap-2">
                        <span className="text-brand-accent">•</span>
                        {service.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}