import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";

export default async function handleTeacherBacklinks(teacher) {
    const { _id, classes = [], subjects = [] } = teacher;
    // Update back references in Subjects
    await SubjectModel.updateMany(
        { _id: { $in: subjects } },
        { $addToSet: { teachers: _id } }
    );

    // Update back references in Classrooms
    await ClassroomModel.updateMany(
        { _id: { $in: classes } },
        { $addToSet: { teachers: _id } }
    );
}