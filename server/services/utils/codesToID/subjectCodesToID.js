import SubjectModel from "../../../models/Subjects.js";
export default async function subjectCodesToID(subjectArr) {
    // Convert subject {code, type} to IDs
    const subjectIds = await Promise.all(
        subjectArr.map(async (subject) => {
            const subjectDoc = await SubjectModel.findOne(subject);
            if (!subjectDoc) {
                throw new Error(`Subject with code '${subject.code}' and type '${subject.type}' not found`);
            }
            return subjectDoc._id;
        })
    );
    return subjectIds;
}
