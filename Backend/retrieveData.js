import Rooms from './data/classroom_schedule.js';
import teachers from './data/teachers.js';

const getTeacherSchedule = (teacherCode) => {
    const teacher = teachers.find(t => t.code === teacherCode);
    if (!teacher) {
        throw new Error(`No teacher found with code: ${teacherCode}`);
    }
    return teacher.getSchedule(Rooms);
};

const getClassroomSchedule = (room) => {
    const classroom = Rooms.find(r => r.room === room);
    if (!classroom) {
        throw new Error(`No classroom found with name: ${room}`);
    }
    return classroom.getClassroomSchedule();
};

export default { getTeacherSchedule, getClassroomSchedule };
