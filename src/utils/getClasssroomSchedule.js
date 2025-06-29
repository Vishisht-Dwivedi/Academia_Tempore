import { client } from "@/lib/graphqlClient.js";
import GetClassroomSchedule from "@/queries/classroomSchedule.gql";

export async function getClassroomSchedule(room) {
    const data = await client.request(GetClassroomSchedule, { room });
    return data.classroom;
}