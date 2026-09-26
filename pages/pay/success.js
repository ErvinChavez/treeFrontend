import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";

import SEO from "@/components/common/SEO";
import { GET_PAYMENT_STATUS } from "@/lib/graphql/queries/payments";
import { formatCurrency } from "@/utils/format";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const [sessionId, setSessionId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { session_id, token: t } = router.query;
    setSessionId(session_id || null);
    setToken(t || null);
  }, [router.isReady, router.query]);

  const { data, loading, error } = useQuery(GET_PAYMENT_STATUS, {
    variables: { sessionId },
    skip: !sessionId,
    fetchPolicy: "network-only",
  });

  if (!router.isReady) return null;

  return (
    <>
      <SEO
        title="Payment | Chavez Tree Service"
        description="Payment confirmation for Chavez Tree Service."
        path="/pay/success"
        noindex
      />

      <div className="section max-w-xl mx-auto">
        <div className="card text-center stack">
          {!sessionId && (
            <>
              <h2 className="text-title">We couldn't find that payment</h2>
              <p className="text-muted">
                If you completed a payment, please give us a call and we'll confirm it on our end.
              </p>
            </>
          )}

          {sessionId && loading && (
            <p className="text-muted">Confirming your payment...</p>
          )}

          {sessionId && error && (
            <>
              <h2 className="text-title">We couldn't confirm this payment</h2>
              <p className="text-muted">
                Please give us a call and we'll check on it right away.
              </p>
            </>
          )}

          {sessionId && data?.paymentStatus && (
            data.paymentStatus.paid ? (
              <>
                <h2 className="text-title">Payment received 🌲</h2>
                <p className="text-muted">
                  Thank you! We've received your payment
                  {data.paymentStatus.amountTotal
                    ? ` of ${formatCurrency(data.paymentStatus.amountTotal)}`
                    : ""}
                  .
                </p>
              </>
            ) : (
              <>
                <h2 className="text-title">Payment processing</h2>
                <p className="text-muted">
                  We're still confirming your payment. This can take a moment
                  — you don't need to do anything else.
                </p>
              </>
            )
          )}

          {token && (
            <p className="text-sm text-muted pt-2">
              <Link href={`/pay?token=${token}`} className="underline">
                View your invoice
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
