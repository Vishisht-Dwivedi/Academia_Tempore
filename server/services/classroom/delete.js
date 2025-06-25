import TeacherModel from "../../models/Teachers.js";
import ClassroomModel from "../../models/Classrooms.js";

export default async function deleteClassroom(roomCode) {
    try {

        const validatedRooom = roomCode.toUpperCase().trim();
        const room = await ClassroomModel.findOne({ room: validatedRooom }).lean();
        if (!room) {
            throw new Error(`Room with code: ${roomCode} not found`);
        }

        // gather all unique teacher IDs from the schedule
        const teacherSet = new Set();
        for (const day of room.schedule) {
            for (const slot of day.slots) {
                if (slot.teacher) teacherSet.add(slot.teacher.toString());
            }
        }

        const teacherIds = [...teacherSet];

        // remove classroom from all linked teachers
        await TeacherModel.updateMany(
            { _id: { $in: teacherIds } },
            { $pull: { classes: room._id } }
        );

        // Delete the classroom
        await ClassroomModel.findByIdAndDelete(room._id);

        return {
            success: true,
            message: `Classroom ${room.room} deleted and backlinks removed from ${teacherIds.length} teacher(s)`
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}
