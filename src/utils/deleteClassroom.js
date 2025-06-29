import { DeleteClassroom } from "@/queries/deleteClassroom.gql";
import { client } from "@/lib/graphqlClient";

export default async function deleteClassroom(room) {
    if (!room) throw new Error("Classroom room code is required");
    const trimmedRoom = room.trim().toLowerCase();

    const { deleteClassroom } = await client.request(DeleteClassroom, {
        room: trimmedRoom
    });

    return deleteClassroom;
}
