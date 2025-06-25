import { DeleteTeacher } from "@/queries/deleteTeacher.gql";
import { client } from "@/lib/graphqlClient";

export default async function deleteTeacher(code) {
    if (!code) throw new Error("Teacher code is required");
    const trimmedCode = code.trim().toLowerCase();

    const { deleteTeacher } = await client.request(DeleteTeacher, {
        code: trimmedCode
    });

    return deleteTeacher;
}
