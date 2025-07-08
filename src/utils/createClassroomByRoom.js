import { CreateClassroom } from "@/queries/createClassroomByRoom.gql";
import { client } from "@/lib/graphqlClient";
import { classroomSchema } from "@/lib/validations/classroom";

export default async function createClassroomByRoom(room) {
    try {

        const validatedRoom = classroomSchema.safeParse({ room });

        if (!validatedRoom.success) {
            throw new Error(`Error while parsing room: ${validatedRoom.error.message}`);
        }

        const { createClassroomByRoom } = await client.request(CreateClassroom, {
            classroom: validatedRoom.data,
        });

        return { success: true, data: createClassroomByRoom };
    } catch (error) {
        return { success: false, error }
    }
}
