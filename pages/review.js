import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SUBMIT_FEEDBACK } from "@/lib/graphql/mutations/jobs";

export default function ReviewPage() {
  const router = useRouter();

  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [submitFeedback] = useMutation(SUBMIT_FEEDBACK);

  useEffect(() => {
    if (!router.isReady) return;

    const { rating } = router.query;
    const numRating = Number(rating);

    // High rating → redirect instantly
    if (numRating >= 4) {
      window.location.href =
        "https://g.page/r/CeBcAA5Lxo0aEBM/review";
      return;
    }

    setUserRating(numRating);
    setLoading(false);
  }, [router.isReady]);

  

  const handleSubmit = async (e) => {
      e.preventDefault();

      const { jobId } = router.query;

    try {
      await submitFeedback({
        variables: {
        jobId: Number(jobId),
        rating: Number(userRating),
        comment,
        },
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your feedback.");
    }
};

  if (!router.isReady || loading) return <p>Loading...</p>;

  if (submitted)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Thank you! Your feedback has been sent.</h2>
        <p>We really appreciate you helping us improve our service.</p>
      </div>
    );

  // Low rating → show feedback form
  return (
    <div
      style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}
    >
      <h2>We're sorry your experience wasn't perfect.</h2>
      <p>Please tell us what we could improve:</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          cols={50}
          placeholder="Your feedback"
          required
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
        <br />
        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}
