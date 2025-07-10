import { client } from "@/lib/graphqlClient.js";
import GetAllClassrooms from "@/queries/allClassrooms.gql";

export const fetchAllClassrooms = async () => {
    try {
        const data = await client.request(GetAllClassrooms);
        return data.allClassrooms;
    } catch (err) {
        console.error("GraphQL Request error:", err);
        throw err;
    }
};
