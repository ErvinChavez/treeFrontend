export default function FeedbackCard({ feedback }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <p className="font-semibold">
        {"⭐".repeat(feedback.rating)}
      </p>

      <p className="text-gray-700 mt-2">
        {feedback.comment || "No comment provided."}
      </p>
    </div>
  );
}