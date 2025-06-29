import { client } from "@/lib/graphqlClient.js";
import GetTeacherSchedule from "@/queries/teacherSchedule.gql";

export async function getTeacherSchedule(code) {
    const data = await client.request(GetTeacherSchedule, { code });
    return data.teacher;
}