import { RemoveScheduleSlot } from "@/queries/removeSlot.gql";
import { client } from "@/lib/graphqlClient";

export default async function ({ room, day, slot }) {
    if (!room || !day || slot === undefined) {
        throw new Error(`Room: ${room}, Day: ${day}, Slot: ${slot} are required fields`);
    }

    const data = await client.request(RemoveScheduleSlot, {
        input: {
            room,
            day,
            slot
        }
    });

    return data.removeScheduleSlot;
}
