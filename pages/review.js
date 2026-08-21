import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client";
import { SUBMIT_FEEDBACK } from "@/lib/graphql/mutations/jobs";
import Head from "next/head";

export default function ReviewPage() {
  const router = useRouter();

  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewToken, setReviewToken] = useState(null);
  const [error, setError] = useState("");
  
  const [submitFeedback] = useMutation(SUBMIT_FEEDBACK);

  useEffect(() => {
    if (!router.isReady) return;

    const { token, rating } = router.query;

    if(!token) {
      console.error("Missing review token");
      return;
    }

    const numRating = Number(rating || 0);

    setReviewToken(token);
    setUserRating(numRating);
    setLoading(false);
  }, [router.isReady, router.query]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewToken) {
      alert("Invalid or expired review link.");
      return;
    }

    if (!userRating || userRating < 1) {
      alert("Invalid rating.");
      return;
    }

    try {
      await submitFeedback({
        variables: {
        token: reviewToken,
        rating: Number(userRating),
        comment,
        },
      });

      setSubmitted(true);
      setError("");
    } catch (err) {
      console.error(err);
      // Apollo Client 4: GraphQL errors are wrapped in CombinedGraphQLErrors
      // instead of a `graphQLErrors` array on the error itself. `err.message`
      // is always safe to read regardless of error type (guaranteed error-like).
      const message = CombinedGraphQLErrors.is(err)
        ? err.errors[0]?.message
        : err?.message;
      setError(message || "There was an error submitting your feedback.");
    }
};

  if (!router.isReady || loading) {
    return <div className="section text-center">Loading your feedback form...</div>;
  }

  const isPositive = Number(userRating) >= 4;

  if (submitted) {
    return (
      <>
        <Head>
          <title>Feedback Submitted | Chavez Tree Service</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="section max-w-xl mx-auto">
          <div className="card text-center stack">

            <h2 className="text-title">
              {isPositive ? "Thank you! 🙌" : "Thank you for your feedback"}
            </h2>

            <p className="text-muted">
              {isPositive
                ? "We’re really glad you had a great experience."
                : "We appreciate you helping us improve our service."}
            </p>
            
            <p className="text-subtitle">
              {isPositive
                ? "Would you mind sharing your experience on Google?"
                : "If you’d like, you can also leave a public review on Google."}
            </p>

            <a
              href="https://g.page/r/CeBcAA5Lxo0aEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${isPositive ? "btn-primary" : "btn-accent"}`}
            >
              {isPositive
                ? "Leave a Google Review ⭐"
                : "Leave Feedback on Google"}
            </a>

          </div>
        </div>
      </>
    );
}

  return (
    <>
      <Head>
        <title>Leave Feedback | Chavez Tree Service</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="section max-w-xl mx-auto">
        <div className="card stack text-center">

          <h2 className="text-title">
            {isPositive
              ? "We're glad you had a great experience!"
              : "We’re sorry we didn’t meet expectations."}
          </h2>
          
          <p className="text-muted">
            {isPositive
              ? "Feel free to share any additional comments."
              : "Please tell us what we could improve."}
          </p>
          
          {error && (
            <div className="status-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="stack-sm">

            <textarea
              value={comment}
              onChange={(e) => {setComment(e.target.value); setError("");}}
              rows={5}
              placeholder="Your feedback..."
              required
              className="input resize-none"
            />

            <button
              type="submit"
              disabled={submitted}
              className="btn btn-primary w-full"
            >
              Send Feedback
            </button>
          </form>
        </div>
      
      </div>
    </>
  );
}