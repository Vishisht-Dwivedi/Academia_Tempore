import TeacherModel from "../../models/Teachers.js";
import ClassroomModel from "../../models/Classrooms.js";
import { classroomSchema } from "../../../lib/validations/classroom.js";

export default async function deleteClassroom(roomCode) {
    try {
        const { room } = classroomSchema.parse({ room: roomCode });
        const roomDoc = await ClassroomModel.findOne({ room }).lean();
        if (!roomDoc) {
            throw new Error(`Room with code: ${roomCode} not found`);
        }

        // gather all unique teacher IDs from the schedule
        const teacherSet = new Set();
        for (const day of roomDoc.schedule) {
            for (const slot of day.slots) {
                if (slot.teacher) teacherSet.add(slot.teacher.toString());
            }
        }

        const teacherIds = [...teacherSet];

        // remove classroom from all linked teachers
        await TeacherModel.updateMany(
            { _id: { $in: teacherIds } },
            { $pull: { classes: roomDoc._id } }
        );

        // Delete the classroom
        await ClassroomModel.findByIdAndDelete(roomDoc._id);

        return {
            success: true,
            message: `Classroom ${roomDoc.room} deleted and backlinks removed from ${teacherIds.length} teacher(s)`
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
