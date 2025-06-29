import { client } from "@/lib/graphqlClient.js";
import GetAllTeachers from "@/queries/allTeachers.graphql";

export const fetchAllTeachers = async () => {
    try {
        const data = await client.request(GetAllTeachers);
        return data.teachers;
    } catch (err) {
        console.error("GraphQL Request error:", err);
        throw err;
    }
};
