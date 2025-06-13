import { client } from "@/lib/graphqlClient.js";
import UpdateSchedule from "@/queries/updateSchedule.gql"
export default async function updateSchedule(schedule) {
    const data = await client.request(UpdateSchedule, { schedule });
    return data.updateSchedule;
}