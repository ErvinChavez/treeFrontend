import { gql } from "@apollo/client";

//GraphQL query
export const GET_DASHBOARD = gql`
    query {
        totalJobs
        totalClients
        averageRating
        jobsByStatus {
        status
        count
        }
    }
`;