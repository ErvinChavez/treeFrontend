import { formatCurrency } from "@/utils/format";

export default function ConfirmSendModal({
  title,
  amount,
  amountLabel = "Amount",
  clientName,
  address,
  note,
  confirmLabel = "Confirm & Send",
  sending,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="card stack max-w-sm w-full">
        <h3 className="font-semibold">{title}</h3>

        <div className="stack-xs text-sm">
          {clientName && (
            <p>
              <span className="text-muted">To: </span>
              {clientName}
            </p>
          )}
          {address && (
            <p>
              <span className="text-muted">Address: </span>
              {address}
            </p>
          )}
          <p>
            <span className="text-muted">{amountLabel}: </span>
            <span className="font-semibold text-base">{formatCurrency(amount)}</span>
          </p>
        </div>

        {note && <p className="text-sm text-muted">{note}</p>}

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onConfirm}
            disabled={sending}
            className={`btn btn-primary ${sending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {sending ? "Sending..." : confirmLabel}
          </button>

          <button type="button" onClick={onCancel} disabled={sending} className="btn btn-secondary">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
