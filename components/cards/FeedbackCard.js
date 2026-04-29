export default function FeedbackCard({ feedback }) {
  return (
    <div className="card">
      <p className="text-yellow-500 text-lg">
        {"⭐".repeat(feedback.rating)}
      </p>

      <p className="text-muted mt-2">
        {feedback.comment || "No comment provided."}
      </p>
    </div>
  );
}