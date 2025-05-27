import TeacherModel from "../../../models/Teachers.js";
export default async function teacherCodeToID(teachers) {
    // Convert classroom names to IDs
    const teacherIds = await Promise.all(
        teachers.map(async (teacher) => {
            const teacherID = await TeacherModel.findOne({ code: teacher }, { _id: true });
            if (!teacherID) {
                throw new Error(`Teacher with code '${teacher}' not found`);
            }
            return teacherID._id;
        })
    );
    return teacherIds;
}
