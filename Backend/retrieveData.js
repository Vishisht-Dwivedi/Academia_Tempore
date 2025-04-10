import Rooms from './data/classroom_schedule.js';
import teachers from './data/teachers.js';

const getTeacherSchedule = (teacherCode) => {
    const teacher = teachers.find(t => t.code === teacherCode);
    if (!teacher) {
        throw new Error(`No teacher found with code: ${teacherCode}`);
    }
    return teacher.getSchedule(Rooms);
};
const getTeacherName = (teacherName) => {
    return teachers.filter((teacher) => {
        if (teacher.name.includes(teacherName)) return teacher;
    });
}

const getClassroomSchedule = (room) => {
    const classroom = Rooms.find(r => r.room === room);
    if (!classroom) {
        throw new Error(`No classroom found with name: ${room}`);
    }
    return classroom.getClassroomSchedule();
};

const getClassrooms = (roomNo) => {
    return Rooms
        .filter((classroom) => classroom.room.includes(roomNo))
        .map(({ room }) => ({ room }));
};
export default { getTeacherSchedule, getClassroomSchedule, getTeacherName, getClassrooms };
