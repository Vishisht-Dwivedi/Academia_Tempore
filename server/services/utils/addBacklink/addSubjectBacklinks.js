import TeacherModel from "../../../models/Teachers.js";

export default async function addSubjectBacklinks(subject) {
    const { _id, teachers = [] } = subject;
    // backlink to teacher
    await TeacherModel.updateMany(
        { _id: { $in: teachers } },
        { $addToSet: { subjects: _id } }
    );
}