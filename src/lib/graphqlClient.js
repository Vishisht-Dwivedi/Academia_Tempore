import { GraphQLClient } from "graphql-request";
const isDev = process.env.NODE_ENV !== "production";
export const client = new GraphQLClient(
    isDev
        ? "http://localhost:8080/graphql"
        : `${process.env.RAILWAY_PUBLIC_DOMAIN}/graphql`,
    {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }
);