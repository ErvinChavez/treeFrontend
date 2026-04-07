import { useState } from "react";

export default function FeedbackForm({ job, submitFeedback }) {
    const [comment, setComment] = useState(job.feedback?.comment || "");

    if (job.status !== "completed") return null;

    const handleSubmit = () => {
    submitFeedback({
      variables: {
        jobId: Number(job.id),
        rating: job.feedback?.rating || 5,
        comment,
      },
    });
    alert("Feedback submitted!");
    setComment("");
    };

    return (
        <div className="mt-4">
            <p className="font-semibold">Feedback:</p>

            {/* Rating */}
            <select
                defaultValue={job.feedback?.rating || ""}
                onChange={(e) => 
                    submitFeedback({
                        variables: {
                            jobId: Number(job.id),
                            rating: Number(e.target.value),
                            comment,
                        },
                    })
                }
                className="border p-1 rounded mt-1"
            >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                        {r} Star{r > 1 && "s"}
                    </option>
                ))}
            </select>

            {/* Comment */}
            {job.feedback?.rating >= 4 && job.feedback?.googleReviewLink ? (
                <a
                    href={job.feedback.googleReviewLink}
                    target="_blank"
                    className="text-blue-600 underline mt-2 block"
                >
                Leave a Google Review
                </a>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="bg-orange-600 text-white px-4 py-2 mt-2 rounded"
                >
                Leave a Review
                </button>
            )}
        </div>
    );
}