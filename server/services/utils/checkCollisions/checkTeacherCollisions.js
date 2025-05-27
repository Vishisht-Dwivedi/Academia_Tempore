import TeacherModel from "../../../models/Teachers.js";
import ClassroomModel from "../../../models/Classrooms.js";
import { getTeacherByCode } from "../../read/readTeacher.js";
class Schedule {
    constructor() {
        return {
            monday: new Set(),
            tuesday: new Set(),
            wednesday: new Set(),
            thursday: new Set(),
            friday: new Set()
        }
    }
}
//expects a saved classroom and will check if the assigned teacher already has a slot assigned at other classrooms
//if found it will remove that slot and throw an error
// Send leaned documents to avoid mongo id type errors
export default async function checkTeacherCollision(classroom) {
    const { room, schedule } = classroom;

    //making a map of teacher codes with their IDs
    const teacherIDs = new Map();
    //getting unique teachers
    const allTeachers = new Set();
    for (const day of schedule) {
        for (const slot of day.slots) {
            allTeachers.add(slot.teacher.code);
            teacherIDs.set(slot.teacher.code, slot.teacher._id);
        }
    }
    //making a map of teachers with empty schedules
    const teacherSchedules = new Map();
    for (const teacher of allTeachers) {
        teacherSchedules.set(teacher, new Schedule());
    }
    //initializing empty schedule with this classrooms slots for each teacher
    for (const day of schedule) {
        for (const slot of day.slots) {
            const slotTeacher = teacherSchedules.get(slot.teacher.code);
            slotTeacher[day.day].add(slot.slot);
            teacherSchedules.set(slot.teacher.code, slotTeacher);
        }
    }
    //looping through all teachers
    for (const teacher of allTeachers) {
        const teacherDoc = await TeacherModel.findOne({ code: teacher }).populate("classes");
        for (const classroom of teacherDoc.classes) {
            if (classroom.room === room) continue;
            for (const day of classroom.schedule) {
                for (const slot of day.slots) {
                    if (slot.teacher.toString() === teacherIDs.get(teacher).toString()) {
                        if (teacherSchedules.get(teacher)[day.day].has(slot.slot)) {
                            throw new Error(`Collision detected: ${teacherDoc.name} assigned on day: ${day.day} at slot: ${slot.slot} in rooms: ${room} and ${classroom.room}`);
                        }
                        teacherSchedules.get(teacher)[day.day].add(slot.slot);
                    }
                }
            }
        }
    }
}
