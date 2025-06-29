import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://localhost:5000/graphql", {
    headers: {
        "Content-Type": "application/json",
    },
});