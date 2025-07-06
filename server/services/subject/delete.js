import SubjectModel from "../../models/Subjects.js";
import ClassroomModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";

export default async function deleteSubject(code, type) {
    const subject = await SubjectModel.findOne({ code, type });
    if (!subject) {
        throw new Error(`Subject ${code} (${type}) not found`);
    }

    const subjectIdStr = subject._id.toString();

    const classrooms = await ClassroomModel.find({ "schedule.slots.subject": subject._id });

    await Promise.all(
        classrooms.map(async (room) => {
            let updated = false;

            for (const day of room.schedule) {
                const originalLength = day.slots.length;
                day.slots = day.slots.filter(slot => slot.subject.toString() !== subjectIdStr);
                if (day.slots.length !== originalLength) updated = true;
            }

            if (updated) await room.save();
        })
    );

    await TeacherModel.updateMany(
        { subjects: subject._id },
        { $pull: { subjects: subject._id } }
    );

    await SubjectModel.deleteOne({ _id: subject._id });

    return {
        success: true,
        message: `Subject "${subject.name}" deleted and cleaned from all dependencies.`,
    };
}
