import { client } from "@/lib/graphqlClient.js";
import UpdateSchedule from "@/queries/updateSchedule.gql";

export default async function updateSchedule(schedule) {
    try {
        const cleaned = {};

        for (const day of ["monday", "tuesday", "wednesday", "thursday", "friday"]) {
            const slots = schedule[day];
            if (Array.isArray(slots)) {
                cleaned[day] = slots.filter(slot => slot != null);
            } else {
                cleaned[day] = [];
            }
        }
        const data = await client.request(UpdateSchedule, { schedule: cleaned });
        return data.updateSchedule;
    } catch (error) {
        return error;
    }
}
