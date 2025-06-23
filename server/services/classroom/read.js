import ClassroomModel from "../../models/Classrooms.js";

export const getClassroomByID = async (id) => {
    const classroom = await ClassroomModel.findById(id).lean();
    if (!classroom) throw new Error(`Classroom with ID ${id} not found`);
    return classroom;
};
export const getClassroom = async (room) => {
    const classroom = await ClassroomModel.findOne({ room });
    if (!classroom) throw new Error(`Classroom ${room} not found`);
    return classroom;
}