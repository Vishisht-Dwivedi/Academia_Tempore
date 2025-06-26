import { CreateClassroomByRoom } from "@/queries/createClassroomByRoom.gql";
import { client } from "@/lib/graphqlClient";

export default async function createClassroomByRoom(room) {
    if (!room) throw new Error("Room is required");

    const validatedRoom = room.trim().toUpperCase();

    const { createClassroomByRoom } = await client.request(CreateClassroomByRoom, {
        room: validatedRoom
    });

    return createClassroomByRoom;
}
