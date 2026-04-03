import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import FeedbackCard from "@/components/cards/FeedbackCard";

//GraphQL query
const GET_FEEDBACK = gql`
  query {
    jobs {
      id
      feedback {
        rating
        comment
      }
    }
  }
`;

export default function Testimonials() {
  const { data, loading, error } = useQuery(GET_FEEDBACK);

  if (loading) return <p className="p-6">Loading testimonials...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading testimonials</p>;

  //extract only jobs with feedback
  const feedbacks = data.jobs
    .map(job => job.feedback)
    .filter(f => f && f.rating > 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customer Testimonials</h1>

      <div className="grid gap-4">
        {feedbacks.map((feedback, i) => (
          <FeedbackCard key={i} feedback={feedback} />
        ))}
      </div>
    </div>
  );
}