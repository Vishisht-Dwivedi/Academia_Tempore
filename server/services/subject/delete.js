import SubjectModel from "../../models/Subjects.js";
import ClassroomModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";

export default async function deleteSubject(subjectID) {
    const subject = await SubjectModel.findById(subjectID);
    if (!subject) {
        throw new Error(`Subject with id: ${subjectID} not found`);
    }

    const teacherIDs = subject.teachers;

    for (const teacherID of teacherIDs) {
        const teacher = await TeacherModel.findById(teacherID).lean();
        if (!teacher) continue;

        for (const roomID of teacher.classes) {
            const roomDoc = await ClassroomModel.findById(roomID);
            if (!roomDoc) continue;

            let updated = false;

            for (const day of roomDoc.schedule) {
                const newSlots = day.slots.filter(
                    slot => slot.subject.toString() !== subjectID.toString()
                );
                if (newSlots.length !== day.slots.length) {
                    day.slots = newSlots;
                    updated = true;
                }
            }

            if (updated) {
                await roomDoc.save();
            }
        }
    }

    // Remove subject from all linked teachers
    await TeacherModel.updateMany(
        { subjects: subjectID },
        { $pull: { subjects: subjectID } }
    );

    // Finally, delete the subject
    await SubjectModel.findByIdAndDelete(subjectID);

    return {
        success: true,
        message: `Subject "${subject.name}" deleted and removed from all teachers and classrooms.`
    };
}
