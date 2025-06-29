import { client } from "@/lib/graphqlClient.js";
import GetAllSubjects from "@/queries/allSubjects.gql";

export const fetchAllSubjects = async () => {
    try {
        const data = await client.request(GetAllSubjects);
        return data.subjects;
    } catch (err) {
        console.error("GraphQL Request error:", err);
        throw err;
    }
};
