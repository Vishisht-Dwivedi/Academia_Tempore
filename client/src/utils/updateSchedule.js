import { client } from "@/lib/graphqlClient.js";
import UpdateSchedule from "@/queries/updateSchedule.gql"
export default async function updateSchedule(schedule) {
    try {
        const data = await client.request(UpdateSchedule, { schedule: schedule });
        return data;
    } catch (error) {
        return error;
    }
}