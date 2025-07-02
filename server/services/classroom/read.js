import ClassroomModel from "../../models/Classrooms.js";
import SubjectModel from "../../models/Subjects.js";
import TeacherModel from "../../models/Teachers.js";

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

export const getClassroomSchedule = async (roomID) => {
    const roomDoc = await ClassroomModel.findById(roomID).lean();
    if (!roomDoc) throw new Error(`Classroom with id: ${roomID} not found`);

    const schedule = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    };

    for (const day of roomDoc.schedule) {
        for (const slot of day.slots) {
            const [subjectDoc, teacherDoc] = await Promise.all([
                SubjectModel.findById(slot.subject).lean(),
                TeacherModel.findById(slot.teacher).lean()
            ]);

            schedule[day.day].push({
                slot: slot.slot,
                subject: subjectDoc?.name || "Unknown Subject",
                type: subjectDoc?.type || "unknown",
                room: roomDoc.room,
                teacher: teacherDoc?.name || "Unknown Teacher"
            });
        }
    }

    return schedule;
};
export const getAllClassrooms = async () => {
    const allClassrooms = await ClassroomModel.find({}).lean();
    return allClassrooms;
}
