import { useState, useEffect } from "react";
import { CombinedGraphQLErrors } from "@apollo/client";

import StatusDropdown from "@/components/forms/StatusDropdown";
import EmployeeAssignForm from "@/components/forms/EmployeeAssignForm";
import ClientInfo from "@/components/cards/ClientInfo";
import ServiceList from "@/components/cards/ServiceList";
import PhotoGallery from "@/components/cards/PhotoGallery";
import PhotoUploadSection from "@/components/forms/PhotoUploadSection";
import ConfirmSendModal from "@/components/common/ConfirmSendModal";
import { PAYMENT_METHODS, formatPaymentMethod, formatCurrency } from "@/utils/format";

//a quote email only makes sense before any work is scheduled/done
const QUOTABLE_STATUSES = ["pending_quote", "quote_scheduled"];

export default function JobCard({
  job,
  updateStatus,
  updateJobTotalAmount,
  sendReceiptEmail,
  sendQuoteEmail,
  recordPayment,
  assignEmployees,
  empData,
  selectedEmployees,
  setSelectedEmployees,
  refetch,
}) {
  const [totalAmount, setTotalAmount] = useState(job.totalAmount || "");
  const [receiptError, setReceiptError] = useState("");
  const [sendingReceipt, setSendingReceipt] = useState(false);
  const [confirmingReceipt, setConfirmingReceipt] = useState(false);

  const [quoteError, setQuoteError] = useState("");
  const [sendingQuote, setSendingQuote] = useState(false);
  const [confirmingQuote, setConfirmingQuote] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("check");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [recordingPayment, setRecordingPayment] = useState(false);

  useEffect(() => {
    setTotalAmount(job.totalAmount || "");
  }, [job.totalAmount]);

  const handleSaveTotalAmount = async () => {
    if (totalAmount === "" || Number(totalAmount) < 0) {
      alert("Please enter a valid total amount.");
      return;
    }

    try {
      await updateJobTotalAmount({
        variables: {
          jobId: Number(job.id),
          totalAmount: Number(totalAmount),
        },
      });

      alert("Job total saved.");
    } catch (err) {
      console.error("Error saving job total:", err);
      alert("Could not save job total.");
    }
  };

  const handleConfirmSendReceipt = async () => {
    setReceiptError("");
    setSendingReceipt(true);

    try {
      await sendReceiptEmail({ variables: { jobId: Number(job.id) } });
      setConfirmingReceipt(false);
    } catch (err) {
      console.error("Error sending receipt email:", err);
      const message = CombinedGraphQLErrors.is(err) ? err.errors[0]?.message : err?.message;
      setReceiptError(message || "Could not send receipt email.");
    } finally {
      setSendingReceipt(false);
    }
  };

  const handleConfirmSendQuote = async () => {
    setQuoteError("");
    setSendingQuote(true);

    try {
      await sendQuoteEmail({ variables: { jobId: Number(job.id) } });
      setConfirmingQuote(false);
    } catch (err) {
      console.error("Error sending quote email:", err);
      const message = CombinedGraphQLErrors.is(err) ? err.errors[0]?.message : err?.message;
      setQuoteError(message || "Could not send quote email.");
    } finally {
      setSendingQuote(false);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    setPaymentError("");

    if (!(Number(paymentAmount) > 0)) {
      setPaymentError("Enter a payment amount greater than zero.");
      return;
    }

    setRecordingPayment(true);

    try {
      await recordPayment({
        variables: {
          jobId: Number(job.id),
          method: paymentMethod,
          amount: Number(paymentAmount),
          note: paymentNote || null,
        },
      });

      setPaymentAmount("");
      setPaymentNote("");
    } catch (err) {
      console.error("Error recording payment:", err);
      const message = CombinedGraphQLErrors.is(err) ? err.errors[0]?.message : err?.message;
      setPaymentError(message || "Could not record payment.");
    } finally {
      setRecordingPayment(false);
    }
  };

  const amountPaid = Number(job.amountPaid || 0);
  const balanceRemaining = Number(job.balanceRemaining || 0);
  const canTakePayments = job.status === "completed" || job.status === "paid";
  const isQuotable = QUOTABLE_STATUSES.includes(job.status);
  const jobAddress = `${job.street}, ${job.city}, ${job.state} ${job.zip}`;

  return (
    <div className="card stack">
      {/* Status Dropdown */}
      <StatusDropdown job={job} updateStatus={updateStatus} />

      <div className="stack-sm">
        {/* Client Info */}
        <ClientInfo client={job.client} />

        {/* Services */}
        <ServiceList services={job.services} />
      </div>

      <div className="section">
        <h3 className="font-semibold">Job Total</h3>

        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter agreed total"
            className="border rounded px-3 py-2 w-full"
          />

          <button
            type="button"
            onClick={handleSaveTotalAmount}
            className="px-4 py-2 rounded bg-black text-white"
          >
            Save
          </button>
        </div>

        {job.totalAmount ? (
          <p className="text-sm text-muted mt-2">
            Total: {formatCurrency(job.totalAmount)}
          </p>
        ) : null}
      </div>

      {isQuotable && (
        <div className="section">
          <h3 className="font-semibold">Quote</h3>

          <div className="mt-2 stack-sm">
            {!job.totalAmount && (
              <p className="text-sm text-red-500">
                Add an estimated amount above before emailing a quote.
              </p>
            )}

            {job.totalAmount && (
              <button
                type="button"
                onClick={() => setConfirmingQuote(true)}
                disabled={sendingQuote}
                className="btn btn-primary self-start"
              >
                {sendingQuote ? "Sending..." : job.quoteSent ? "Resend Quote" : "Send Quote"}
              </button>
            )}

            {job.quoteSent && (
              <p className="text-sm text-green-700">
                Quote emailed{job.quoteSentAt ? ` on ${new Date(Number(job.quoteSentAt)).toLocaleDateString()}` : ""} —
                estimate only, nothing owed.
              </p>
            )}

            {quoteError && <div className="status-error">{quoteError}</div>}
          </div>
        </div>
      )}

      {canTakePayments && (
        <div className="section">
          <h3 className="font-semibold">Payment</h3>

          {job.totalAmount ? (
            <div className="mt-2 stack-sm">
              <div className="flex flex-wrap gap-4 text-sm">
                <span>Total: {formatCurrency(job.totalAmount)}</span>
                <span>Paid: {formatCurrency(amountPaid)}</span>
                <span className={balanceRemaining > 0 ? "text-red-600 font-semibold" : "text-green-700 font-semibold"}>
                  {balanceRemaining > 0 ? `Balance Due: ${formatCurrency(balanceRemaining)}` : "Paid in Full"}
                </span>
              </div>

              {job.status === "paid" && (
                <p className="text-sm text-green-700">
                  Marked paid{job.paidAt ? ` on ${new Date(Number(job.paidAt)).toLocaleDateString()}` : ""}.
                </p>
              )}

              {job.payments?.length > 0 && (
                <div className="text-sm">
                  <p className="font-semibold">Payment history</p>
                  <ul className="mt-1 space-y-1">
                    {job.payments.map((p) => (
                      <li key={p.id} className="flex justify-between gap-2">
                        <span>
                          {formatPaymentMethod(p.method)}
                          {p.note ? ` — ${p.note}` : ""}
                        </span>
                        <span>{formatCurrency(p.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {balanceRemaining > 0 && (
                <form onSubmit={handleRecordPayment} className="flex flex-wrap gap-2 items-end pt-2">
                  <label className="text-sm">
                    Method
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="input mt-1"
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {formatPaymentMethod(m)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm">
                    Amount
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
                      className="input mt-1 w-28"
                    />
                  </label>

                  <label className="text-sm flex-1 min-w-32">
                    Note (optional)
                    <input
                      type="text"
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                      placeholder="e.g. check #1234"
                      className="input mt-1"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={recordingPayment}
                    className="btn btn-secondary"
                  >
                    {recordingPayment ? "Recording..." : "Record Payment"}
                  </button>
                </form>
              )}

              {paymentError && <div className="status-error">{paymentError}</div>}
            </div>
          ) : (
            <p className="text-sm text-muted mt-2">Add a job total before recording payments.</p>
          )}
        </div>
      )}

      <div className="section">
        <h3 className="font-semibold">Receipt &amp; Review</h3>

        <div className="mt-2 stack-sm">
          {job.status === "completed" || job.status === "paid" ? (
            <>
              {!job.totalAmount && (
                <p className="text-sm text-red-500">
                  Add a job total before sending the receipt.
                </p>
              )}

              {job.totalAmount && (
                <button
                  type="button"
                  onClick={() => setConfirmingReceipt(true)}
                  disabled={sendingReceipt}
                  className="btn btn-primary self-start"
                >
                  {sendingReceipt
                    ? "Sending..."
                    : job.paymentRequested
                      ? "Resend Receipt"
                      : "Send Receipt"}
                </button>
              )}

              {job.paymentRequested && (
                <p className="text-sm text-green-700">
                  Receipt email sent{job.reviewRequested ? " (includes payment options and review request)" : ""}.
                </p>
              )}

              {job.paymentLink && (
                <p className="text-sm text-muted break-all">
                  Invoice link:{" "}
                  <a href={job.paymentLink} target="_blank" rel="noopener noreferrer" className="underline">
                    {job.paymentLink}
                  </a>
                </p>
              )}

              {receiptError && <div className="status-error">{receiptError}</div>}
            </>
          ) : (
            <p className="text-sm text-muted">
              Available once the job is marked completed.
            </p>
          )}
        </div>
      </div>

      <div className="section">
        {/* Photos */}
        <PhotoGallery photos={job.photos} />

        {/* Upload Photos */}
        <PhotoUploadSection jobId={job.id} refetch={refetch} />
      </div>

      <div className="section">
        {/* Assign Employees */}
        <EmployeeAssignForm
          job={job}
          empData={empData}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          assignEmployees={assignEmployees}
        />
      </div>

      {confirmingQuote && (
        <ConfirmSendModal
          title="Send this quote?"
          amount={Number(job.totalAmount)}
          amountLabel="Estimated cost"
          clientName={job.client?.name}
          address={jobAddress}
          note="The client gets an email with this estimate — no balance, no payment link, nothing owed."
          sending={sendingQuote}
          onConfirm={handleConfirmSendQuote}
          onCancel={() => setConfirmingQuote(false)}
        />
      )}

      {confirmingReceipt && (
        <ConfirmSendModal
          title={balanceRemaining > 0 ? "Send this receipt?" : "Resend this receipt?"}
          amount={balanceRemaining > 0 ? balanceRemaining : Number(job.totalAmount)}
          amountLabel={balanceRemaining > 0 ? "Balance due" : "Total (paid in full)"}
          clientName={job.client?.name}
          address={jobAddress}
          note="The client gets the receipt, ways to pay, and the review request."
          sending={sendingReceipt}
          onConfirm={handleConfirmSendReceipt}
          onCancel={() => setConfirmingReceipt(false)}
        />
      )}
    </div>
  );
}
