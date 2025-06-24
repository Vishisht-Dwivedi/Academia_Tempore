import ClassroomModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";
import SubjectModel from "../../models/Subjects.js";

export default async function deleteTeacher(teacherID) {
    const teacher = await TeacherModel.findById(teacherID);
    if (!teacher) {
        throw new Error(`Teacher with id: ${teacherID} not found`);
    }

    // Remove teacher from all linked classrooms
    for (const roomId of teacher.classes) {
        const roomDoc = await ClassroomModel.findById(roomId);
        if (!roomDoc) continue;

        let updated = false;

        for (const day of roomDoc.schedule) {
            const newSlots = day.slots.filter(slot => slot.teacher.toString() !== teacherID.toString());
            if (newSlots.length !== day.slots.length) {
                day.slots = newSlots;
                updated = true;
            }
        }

        if (updated) {
            await roomDoc.save();
        }
    }

    // Remove teacher from all linked subjects
    await SubjectModel.updateMany(
        { teachers: teacherID },
        { $pull: { teachers: teacherID } }
    );

    // Delete teacher document
    await TeacherModel.findByIdAndDelete(teacherID);

    return {
        success: true,
        message: `Teacher "${teacher.name}" deleted and removed from all classes and subjects.`
    };
}
