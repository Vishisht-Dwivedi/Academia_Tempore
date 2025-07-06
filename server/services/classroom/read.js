import ClassroomModel from "../../models/Classrooms.js";
/**
 * Find a classroom by filter (room or _id)
 * @param {Object} filter - { room } or { _id }
 * @param {Object} options - { select, lean, includeSchedule }
 */
export async function findClassroom(filter) {
    let query = ClassroomModel.findOne(filter).lean();
    const classroom = await query;
    if (!classroom) {
        throw new Error(`Classroom not found for filter: ${JSON.stringify(filter)}`);
    }
    return classroom;

}
/**
 * Get all classrooms
 */
export async function getAllClassrooms() {
    let query = await ClassroomModel.find({});
    const roomArray = [];
    for (const room of query) {
        roomArray.push({ room: room.room, _id: room._id });
    }
    return roomArray;
}
