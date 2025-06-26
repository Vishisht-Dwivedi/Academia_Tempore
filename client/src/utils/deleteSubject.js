import { client } from "@/lib/graphqlClient";
import { DeleteSubject } from "@/queries/deleteSubject.gql";

export default async function deleteSubject(code, type) {
    if (!code || !type) throw new Error("Code and type are required");

    const { deleteSubject } = await client.request(DeleteSubject, {
        code: code.trim().toLowerCase(),
        type: type.trim().toLowerCase()
    });

    return deleteSubject.message;
}
