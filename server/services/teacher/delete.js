import ClassroomModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";
import SubjectModel from "../../models/Subjects.js";

export default async function deleteTeacher(teacherCode) {
    const validatedCode = teacherCode.toLowerCase().trim();
    const teacher = await TeacherModel.findOne({ code: validatedCode });
    if (!teacher) {
        throw new Error(`Teacher with id: ${teacherCode} not found`);
    }

    // Remove teacher from all linked classrooms
    for (const roomId of teacher.classes) {
        const roomDoc = await ClassroomModel.findById(roomId);
        if (!roomDoc) continue;

        let updated = false;

        for (const day of roomDoc.schedule) {
            const newSlots = day.slots.filter(slot => slot.teacher.toString() !== teacher._id.toString());
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
        { teachers: teacher._id },
        { $pull: { teachers: teacher._id } }
    );

    // Delete teacher document
    await TeacherModel.findByIdAndDelete(teacher._id);

    return {
        success: true,
        message: `Teacher "${teacher.name}" deleted and removed from all classes and subjects.`
    };
}
