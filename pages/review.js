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
    const numRating = Number(rating || 0);
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

  const isPositive = userRating >= 4;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold">
          {isPositive ? "Thank you! 🙌" : "Thank you for your feedback"}
        </h2>

        <p className="mt-3 text-gray-600">
          {isPositive
            ? "We’re really glad you had a great experience."
            : "We appreciate you helping us improve our service."}
        </p>

        <p className="mt-6 font-medium">
          {isPositive
            ? "Would you mind sharing your experience on Google?"
            : "If you’d like, you can also leave a public review on Google."}
        </p>

        <a
          href="https://g.page/r/CeBcAA5Lxo0aEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block mt-4 px-5 py-3 rounded-lg font-semibold text-white shadow-md transition
            ${isPositive ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {isPositive
            ? "Leave a Google Review ⭐"
            : "Leave Feedback on Google"}
        </a>
      </div>
    );
}

  return (
    <div className="max-w-xl mx-auto mt-10 text-center px-4">
      <h2 className="text-2xl font-semibold">
        {isPositive
          ? "We're glad you had a great experience!"
          : "We're sorry your experience wasn't perfect."}
      </h2>

      <p className="mt-2 text-gray-600">
        {isPositive
          ? "Feel free to share any additional comments."
          : "Please tell us what we could improve."}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Your feedback..."
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}
