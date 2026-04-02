export default function FeedbackForm({ job, submitFeedback }) {
    if (job.status !== "completed") return null;

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
                        comment: job.feedback?.comment || "",
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
            <textarea
                placeholder="Leave a comment..."
                defaultValue={job.feedback?.comment || ""}
                onBlur={(e) =>
                    submitFeedback({
                        variables: {
                        jobId: Number(job.id),
                        rating: job.feedback?.rating || 5,
                        comment: e.target.value,
                        },
                    })
                }
                className="w-full border p-2 rounded mt-2"
            />

            {/* Google Review Link */}
            {job.feedback?.googleReviewLink && (
                <a
                    href={job.feedback.googleReviewLink}
                    target="_blank"
                    className="text-blue-600 underline mt-2 block"
                >
                    Leave a Google Review
                </a>
            )}
        </div>
    );
}