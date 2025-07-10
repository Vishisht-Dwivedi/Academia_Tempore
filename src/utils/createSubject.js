import { client } from "@/lib/graphqlClient";
import { subjectSchema } from "@/lib/validations/subject";
import { CreateSubject } from "@/queries/createSubject.gql";

/**
 * Create a new subject in the system.
 * @param {Object} subject - Subject object { name, code, type, teachers? }
 * @returns {Promise<Object>} - Created subject info from the backend
 */
export default async function createSubject({ name, code, type }) {
    if (!name || !code || !type) {
        throw new Error("All fields (name, code, type) are required");
    }

    const validationResult = subjectSchema.safeParse({ name, code, type });

    if (!validationResult.success) {
        const errorMessages = validationResult.error.issues
            .map(issue => `${issue.path.join(".")}: ${issue.message}`)
            .join("; ");
        throw new Error("Validation Error(s): " + errorMessages);
    }

    const input = validationResult.data;

    try {
        const { createSubject } = await client.request(CreateSubject, { input });
        return createSubject;
    } catch (err) {
        console.error("GraphQL Error while creating subject:", err);
        throw new Error("Failed to create subject. Please try again.");
    }
}