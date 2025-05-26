import ClassroomModel from "../../models/Classrooms.js";
const getClassroomByID = async (_id) => {
    const classroom = await ClassroomModel.findById(_id)
        .populate("schedule.slots.teacher", ["code", "name"])
        .populate("schedule.slots.subject", ["code", "type", "name"])
        .lean();
    if (!classroom) {
        throw new Error(`No classroom found with id: ${_id}`);
    }
    return classroom;
}
const getClassroomByRoom = async (room) => {
    const validatedRoom = room.trim().toUpperCase();
    const classroom = await ClassroomModel.findOne({ room: validatedRoom })
        .populate("schedule.slots.teacher", ["code", "name"])
        .populate("schedule.slots.subject", ["code", "type", "name"])
        .lean();
    if (!classroom) {
        throw new Error(`No classroom found with id: ${_id}`);
    }
    return classroom;
}
export { getClassroomByID, getClassroomByRoom }