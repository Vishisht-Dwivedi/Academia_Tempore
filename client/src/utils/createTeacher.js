// src/utils/createTeacher.js
import { client } from "@/lib/graphqlClient";
import { CreateTeacher } from "@/queries/createTeacher.gql";

export default async function createTeacher(name, code) {
    if (!name || !code) throw new Error("Both name and code are required");

    const trimmedName = name.trim();
    const trimmedCode = code.trim().toLowerCase();

    const { createTeacher } = await client.request(CreateTeacher, {
        name: trimmedName,
        code: trimmedCode,
    });

    return createTeacher;
}
