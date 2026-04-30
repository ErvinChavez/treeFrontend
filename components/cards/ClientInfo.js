export default function ClientInfo({ client }) {
    return (
        <div className="stack-xs text-body">
            <p>
                Client: <span className="font-semibold">{client?.name}</span>
            </p>
            <p className="text-muted">{client?.email}</p>
            <p className="text-muted">{client?.phone}</p>
        </div>
    );
}