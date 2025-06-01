import ClassroomModel from "../../models/Classrooms.js";
const getClassroomByID = async (_id) => {
    const classroom = await ClassroomModel.findById(_id).lean();
    if (!classroom) {
        throw new Error(`No classroom found with id: ${_id}`);
    }
    return classroom;
}
const getClassroomByRoom = async (room) => {
    const validatedRoom = room.trim().toUpperCase();
    const classroom = await ClassroomModel.findOne({ room: validatedRoom }).lean();
    if (!classroom) {
        throw new Error(`No classroom found with id: ${_id}`);
    }
    return classroom;
}
const getAllClassroom = async () => {
    const classrooms = await ClassroomModel.find({}).lean();
    return classrooms;
}

export { getClassroomByID, getClassroomByRoom, getAllClassroom }