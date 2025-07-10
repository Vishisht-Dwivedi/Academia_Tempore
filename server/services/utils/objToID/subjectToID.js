import SubjectModel from "../../../models/Subjects.js";
import { subjectSchema } from "../../../../lib/validations/subject.js";
import createSubject from "../../subject/create.js";

/**
 * Resolves or creates a Subject document and returns its MongoDB ObjectId.
 */
export default async function subjectToID(subject) {
    const parsed = subjectSchema.safeParse(subject);
    if (!parsed.success) {
        throw new Error(`Invalid subject: ${parsed.error.message}`);
    }

    const data = parsed.data;

    let subjectDoc = await SubjectModel.findOne({
        code: data.code,
        type: data.type,
    }).lean();

    if (!subjectDoc) {
        const created = await createSubject(data);
        if (!created.success) {
            throw new Error(`Failed to create subject with code: ${data.code}`);
        }
        subjectDoc = created.data;
    }

    return subjectDoc._id;
}
