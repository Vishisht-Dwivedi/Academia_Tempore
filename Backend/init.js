import { classrooms } from './data/classroom_schedule.js';
import teachers from './data/teachers.js';
const teacherSchedule = teachers.find(t => t.name === "Dr. Varun Bajaj");
const schedule = teacherSchedule.getSchedule(classrooms);

console.log(JSON.stringify(schedule, null, 2));
