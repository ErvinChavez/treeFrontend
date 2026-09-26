import { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client";

import { GET_CLIENT_BY_EMAIL } from "@/lib/graphql/queries/payments";
import { formatStatus } from "@/utils/format";
import ConfirmSendModal from "@/components/common/ConfirmSendModal";

const STATUS_OPTIONS = [
  "pending_quote",
  "quote_scheduled",
  "scheduled",
  "in_progress",
  "completed",
];

const QUOTABLE_STATUSES = ["pending_quote", "quote_scheduled"];

const EMAIL_LOOKUP_DELAY_MS = 500;

export default function AddJobForm({ services, createJob, sendQuoteEmail, loading, onDone, onCancel }) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    serviceIds: [],
    initialStatus: "pending_quote",
    totalAmount: "",
    sendQuote: false,
  });

  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(false);
  const emailLookupTimer = useRef(null);

  const [lookupClient, { data: clientData, loading: lookupLoading }] = useLazyQuery(
    GET_CLIENT_BY_EMAIL,
    { fetchPolicy: "network-only" },
  );

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  useEffect(() => {
    if (emailLookupTimer.current) clearTimeout(emailLookupTimer.current);

    const email = form.clientEmail.trim();
    if (!email.includes("@")) return;

    emailLookupTimer.current = setTimeout(() => {
      lookupClient({ variables: { email } });
    }, EMAIL_LOOKUP_DELAY_MS);

    return () => clearTimeout(emailLookupTimer.current);
  }, [form.clientEmail, lookupClient]);

  const handleServiceChange = (id) => {
    const numId = Number(id);
    setForm((prev) => {
      const exists = prev.serviceIds.includes(numId);
      return {
        ...prev,
        serviceIds: exists
          ? prev.serviceIds.filter((s) => s !== numId)
          : [...prev.serviceIds, numId],
      };
    });
  };

  const isQuotable = QUOTABLE_STATUSES.includes(form.initialStatus);
  const wantsQuoteSent = isQuotable && form.sendQuote;

  const validate = () => {
    if (
      !form.clientName.trim() ||
      !form.clientEmail.trim() ||
      !form.clientPhone.trim() ||
      !form.street.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.zip.trim()
    ) {
      return "All client and address fields are required.";
    }

    if (form.totalAmount !== "" && Number(form.totalAmount) < 0) {
      return "Total amount can't be negative.";
    }

    if (wantsQuoteSent && (form.totalAmount === "" || !(Number(form.totalAmount) > 0))) {
      return "Enter an estimated amount before emailing a quote.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (wantsQuoteSent) {
      setConfirming(true);
      return;
    }

    await submitJob();
  };

  const submitJob = async (alsoSendQuote) => {
    try {
      const res = await createJob({
        variables: {
          clientName: form.clientName,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone,
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          serviceIds: form.serviceIds,
          initialStatus: form.initialStatus,
          totalAmount: form.totalAmount === "" ? null : Number(form.totalAmount),
        },
      });

      if (alsoSendQuote) {
        const newJobId = res?.data?.createQuoteRequest?.id;

        if (newJobId) {
          try {
            await sendQuoteEmail({ variables: { jobId: Number(newJobId) } });
          } catch (quoteErr) {
            const message = CombinedGraphQLErrors.is(quoteErr)
              ? quoteErr.errors[0]?.message
              : quoteErr?.message;
            setError(
              `Job was created, but the quote email failed to send: ${message || "please try sending it from the job card."}`,
            );
            return;
          }
        }
      }

      onDone?.();
    } catch (err) {
      const message = CombinedGraphQLErrors.is(err)
        ? err.errors[0]?.message
        : err?.message;
      setError(message || "Could not create job.");
    }
  };

  const handleConfirmSend = async () => {
    setSendingQuote(true);
    await submitJob(true);
    setSendingQuote(false);
    setConfirming(false);
  };

  const existingClient = clientData?.clientByEmail;

  return (
    <div className="card stack">
      <h3 className="font-semibold">Add Job</h3>
      <p className="text-sm text-muted">
        For jobs that come by phone or word of mouth — this creates the client and job
        record directly, no public form needed.
      </p>

      {error && <div className="status-error">{error}</div>}

      <form onSubmit={handleSubmit} className="stack">
        <div className="stack-sm">
          <input
            name="clientName"
            placeholder="Client name"
            value={form.clientName}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="email"
            name="clientEmail"
            placeholder="Client email"
            value={form.clientEmail}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="tel"
            inputMode="tel"
            name="clientPhone"
            placeholder="Client phone"
            value={form.clientPhone}
            onChange={handleChange}
            className="input"
            required
          />

          {lookupLoading && (
            <p className="text-sm text-muted">Checking for an existing client...</p>
          )}

          {!lookupLoading && existingClient && (
            <div className="status-error bg-blue-50 text-blue-800 border-blue-200">
              <p className="font-semibold">
                Existing client — {existingClient.jobs.length} previous job
                {existingClient.jobs.length === 1 ? "" : "s"}
              </p>
              <ul className="text-sm mt-1 space-y-1">
                {existingClient.jobs.slice(0, 5).map((j) => (
                  <li key={j.id}>
                    {formatStatus(j.status)} — {j.street}, {j.city}
                    {j.totalAmount ? ` — ${Number(j.totalAmount).toFixed(2)}` : ""}
                  </li>
                ))}
              </ul>
              <p className="text-sm mt-1">
                This will add a brand new job for them — their past jobs are untouched.
              </p>
            </div>
          )}
        </div>

        <div className="stack-sm">
          <input
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="zip"
            inputMode="numeric"
            placeholder="ZIP"
            value={form.zip}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="stack-xs">
          <p className="section-title">Services</p>
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-3 min-h-11 px-3 py-2 rounded-lg border border-brand-wood-secondary/20 hover:bg-brand-light/40 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form.serviceIds.includes(Number(service.id))}
                onChange={() => handleServiceChange(service.id)}
                className="w-5 h-5 shrink-0 accent-brand-accent"
              />
              <span className="text-body">{service.name}</span>
            </label>
          ))}
        </div>

        <div className="stack-sm">
          <label className="text-sm text-muted">
            Where is this job in the workflow?
            <select
              name="initialStatus"
              value={form.initialStatus}
              onChange={handleChange}
              className="input mt-1"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </label>

          {(form.initialStatus === "completed" || isQuotable) && (
            <label className="text-sm text-muted">
              {isQuotable ? "Estimated cost" : "Job total"}
              {isQuotable ? " (for the quote email)" : " (optional, can also set this later)"}
              <input
                type="number"
                step="0.01"
                min="0"
                name="totalAmount"
                placeholder="e.g. 450.00"
                value={form.totalAmount}
                onChange={handleChange}
                className="input mt-1"
              />
            </label>
          )}

          {isQuotable && (
            <label className="flex items-center gap-3 min-h-11 px-3 py-2 rounded-lg border border-brand-wood-secondary/20 hover:bg-brand-light/40 cursor-pointer">
              <input
                type="checkbox"
                name="sendQuote"
                checked={form.sendQuote}
                onChange={handleChange}
                className="w-5 h-5 shrink-0 accent-brand-accent"
              />
              <span className="text-body">
                Email this client a quote — just the estimate, nothing owed
              </span>
            </label>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : wantsQuoteSent ? "Review & Send" : "Create Job"}
          </button>

          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>

      {confirming && (
        <ConfirmSendModal
          title="Send this quote?"
          amount={Number(form.totalAmount)}
          amountLabel="Estimated cost"
          clientName={form.clientName}
          address={`${form.street}, ${form.city}, ${form.state} ${form.zip}`}
          note="The client gets an email with this estimate — no balance, no payment link, nothing owed."
          sending={sendingQuote || loading}
          onConfirm={handleConfirmSend}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
