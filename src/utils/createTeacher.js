// src/utils/createTeacher.js
import { client } from "@/lib/graphqlClient";
import { teacherSchema } from "@/lib/validations/teacher";
import { CreateTeacher } from "@/queries/createTeacher.gql";

export default async function createTeacher(teacher) {
    const validated = teacherSchema.safeParse(teacher);
    if (!validated.success) throw new Error(validated.error.message);
    const { createTeacher } = await client.request(CreateTeacher, {
        teacher: validated.data,
    });
    return createTeacher;
}
