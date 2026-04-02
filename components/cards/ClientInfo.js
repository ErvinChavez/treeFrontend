export default function ClientInfo({ client }) {
    return (
        <div className="mt-2">
            <p><strong>Client:</strong> {client?.name}</p>
            <p>{client?.email}</p>
            <p>{client?.phone}</p>
        </div>
    );
}