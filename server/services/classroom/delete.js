import TeacherModel from "../../models/Teachers.js";
import ClassroomModel from "../../models/Classrooms.js";

export default async function deleteClassroom(roomID) {
    const room = await ClassroomModel.findById(roomID).lean();
    if (!room) {
        throw new Error(`Room with id: ${roomID} not found`);
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
        { $pull: { classes: roomID } }
    );

    // Delete the classroom
    await ClassroomModel.findByIdAndDelete(roomID);

    return {
        success: true,
        message: `Classroom ${room.room} deleted and backlinks removed from ${teacherIds.length} teacher(s)`
    };
}
