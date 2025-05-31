import { getTeacherByID } from "../services/read/readTeacher.js";
class Schedule {
    constructor() {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
        for (const day of days) {
            this[day] = new Set();
        }
    }
}
export default async function getTeacherSchedule(teacherID) {
    const teacherDoc = await getTeacherByID(teacherID);
    for (const classroom of teacherDoc.classes) {

    }
}