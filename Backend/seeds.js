import mongoose from "mongoose";
import { addNewClassroom } from "./models/Classrooms.js";
import { addNewTeacher, getTeacher } from "./models/Teachers.js";
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
for (const classroom of Rooms) {
    for (const day of days) {
        const dailySchedule = classroom.schedule[day];
        if (dailySchedule) {
            for (const lecture of dailySchedule) {
                const teacherDoc = await getTeacher(lecture.teacher);
                lecture.teacher = teacherDoc._id;
            }
        }
    }
    try {
        await addNewClassroom(classroom);
    } catch (err) {
        console.log("error : ", err);
    }

    console.log("Inserted classroom:", classroom.room);
}
