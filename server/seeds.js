import mongoose from "mongoose";
import { addNewClassroom } from "./models/Classrooms.js";
import { addNewTeacher, getTeacherByCode } from "./models/Teachers.js";
import Rooms from "./data/classroom_schedule.js";
import teachers from "./data/teachers.js";

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}

for (const teacher of teachers) {
    await addNewTeacher(teacher);
}
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

async function replaceTeachersWithIDs() {
    for (const classroom of Rooms) {
        for (const day of days) {
            const dailySchedule = classroom.schedule[day];
            if (dailySchedule) {
                for (let i = 1; i <= 8; i++) {
                    const slot = dailySchedule[i];
                    if (slot && slot.teacher) {
                        const teacherDoc = await getTeacherByCode(slot.teacher);
                        if (teacherDoc) {
                            slot.teacher = teacherDoc._id;
                        } else {
                            console.warn(`Teacher with code ${slot.teacher} not found.`);
                        }
                    }
                }
            }
        }
    }
}

await replaceTeachersWithIDs();
for (const classroom of Rooms) {
    try {
        await addNewClassroom(classroom);
        console.log("Inserted classroom:", classroom.room);
    } catch (err) {
        console.log("Error inserting classroom:", err);
    }
}
