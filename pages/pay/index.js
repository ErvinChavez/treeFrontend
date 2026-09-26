import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client";

import SEO from "@/components/common/SEO";
import { GET_JOB_PAYMENT_INFO } from "@/lib/graphql/queries/payments";
import { CREATE_CHECKOUT_SESSION } from "@/lib/graphql/mutations/payments";
import { formatCurrency } from "@/utils/format";

export default function PayPage() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const { token: t, cancelled: c } = router.query;
    setToken(t || null);
    setCancelled(c === "1");
  }, [router.isReady, router.query]);

  const { data, loading, error, refetch } = useQuery(GET_JOB_PAYMENT_INFO, {
    variables: { token },
    skip: !token,
    fetchPolicy: "network-only",
  });

  const [createCheckoutSession, { loading: startingPayment }] = useMutation(
    CREATE_CHECKOUT_SESSION,
  );

  const handlePayNow = async () => {
    setPayError("");

    try {
      const res = await createCheckoutSession({ variables: { token } });
      const checkoutUrl = res?.data?.createCheckoutSessionForToken?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setPayError("Could not start payment. Please try again.");
      }
    } catch (err) {
      console.error("Error starting payment:", err);
      const message = CombinedGraphQLErrors.is(err) ? err.errors[0]?.message : err?.message;
      setPayError(message || "Could not start payment. Please try again.");
      refetch();
    }
  };

  if (!router.isReady) return null;

  const info = data?.jobPaymentInfo;
  const isPaid = info?.paid || (info && info.balanceRemaining <= 0);

  return (
    <>
      <SEO
        title="Pay Your Invoice | Chavez Tree Service"
        description="Pay your Chavez Tree Service invoice online."
        path="/pay"
        noindex
      />

      <div className="section max-w-xl mx-auto">
        <div className="card stack">
          <h2 className="text-title">Chavez Tree Service</h2>

          {!token && (
            <p className="text-muted">
              This link is missing some information. Please use the payment link from
              your invoice email, or give us a call.
            </p>
          )}

          {token && loading && <p className="text-muted">Loading your invoice...</p>}

          {token && error && (
            <p className="text-muted">
              We couldn't find that invoice. Please use the payment link from your
              invoice email, or give us a call and we'll help you out.
            </p>
          )}

          {token && info && (
            <div className="stack-sm">
              <p className="text-muted">{info.serviceAddress}</p>

              <div className="flex flex-wrap gap-4 text-sm pt-2">
                <span>Total: {formatCurrency(info.totalAmount)}</span>
                {info.amountPaid > 0 && <span>Paid: {formatCurrency(info.amountPaid)}</span>}
              </div>

              {isPaid ? (
                <p className="text-subtitle text-green-700 font-semibold pt-2">
                  Paid in full — thank you!
                </p>
              ) : (
                <>
                  <p className="text-title font-semibold pt-2">
                    Balance Due: {formatCurrency(info.balanceRemaining)}
                  </p>

                  {cancelled && (
                    <div className="status-error">
                      Payment wasn't completed. No charge was made — you can try again below.
                    </div>
                  )}

                  {payError && <div className="status-error">{payError}</div>}

                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={startingPayment}
                    className="btn btn-primary w-full"
                  >
                    {startingPayment ? "Redirecting..." : "Pay Now"}
                  </button>

                  <p className="text-sm text-muted">
                    You'll be taken to a secure Stripe payment page. You can also pay by
                    Zelle, Venmo, or Cash App to 404-886-1996, or by check or cash.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
