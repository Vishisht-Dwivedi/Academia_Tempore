import { client } from "@/lib/graphqlClient";
import { CreateSubject } from "@/queries/createSubject.gql";

export default async function createSubject(name, code, type) {
    if (!name || !code || !type) throw new Error("All fields are required");

    const trimmedName = name.trim();
    const trimmedCode = code.trim().toUpperCase();
    const trimmedType = type.trim().toLowerCase();

    const { createSubject } = await client.request(CreateSubject, {
        name: trimmedName,
        code: trimmedCode,
        type: trimmedType
    });

    return createSubject;
}
