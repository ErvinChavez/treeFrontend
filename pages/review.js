// pages/review.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ReviewPage() {
  const router = useRouter();
  const { jobId, rating } = router.query;

  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId || !rating) return;

    // Fetch from backend to handle high/low rating logic
    const fetchRating = async () => {
      try {
        const res = await fetch(`http://localhost:5000/review?jobId=${jobId}&rating=${rating}`);
        const data = await res.json();

        if (data.redirect) {
          // High rating → redirect to Google review
          window.location.href = data.redirect;
        } else {
          setUserRating(data.rating);
        }
      } catch (err) {
        console.error("Error fetching review info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [jobId, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId || !userRating) return;

    try {
      const res = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, rating: userRating, comment }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "There was an error submitting your feedback.");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your feedback.");
    }
  };

  if (loading) return <p>Loading...</p>;
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
