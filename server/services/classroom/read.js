import ClassroomsModel from "../../models/Classrooms.js";
const getAllClassrooms = async () => {
    return await ClassroomsModel.find({});
};

const getClassroom = async (room) => {
    return await ClassroomsModel.findOne({ room });
};

const getClassroomScheduleById = async (_id) => {
    return await ClassroomsModel.findById(_id);
};
export { getAllClassrooms, getClassroom, getClassroomScheduleById }