export default function ClientInfo({ client }) {
    return (
        <div className="section">
            <p className="section-title">Client:</p>
            <p className="font-medium">{client?.name}</p>
            <p className="text-muted">{client?.email}</p>
            <p className="text-muted">{client?.phone}</p>
        </div>
    );
}