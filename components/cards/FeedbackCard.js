export default function FeedbackCard({ feedback }) {
  return (
    <div className="card space-y-2">
      <p className="rating">
        {"⭐".repeat(feedback.rating)}
      </p>

      <p className="text-body">
        {feedback.comment || "No comment provided."}
      </p>
    </div>
  );
}