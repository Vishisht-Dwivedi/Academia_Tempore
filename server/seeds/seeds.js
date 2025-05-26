import mongoose from "mongoose";
import createTeacher from "../services/create/createTeacher.js";
import createSubject from "../services/create/createSubject.js";
import createClassroom from "../services/create/createClassroom.js";
import teachers from "./teachers.js";
import subjects from "./subjects.js";
import Rooms from "./classroom_schedule.js";
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
for (const teacher of teachers) {
    try {
        const savedTeacher = await createTeacher(teacher);
        console.log(savedTeacher);
    } catch (error) {
        console.log(error);
    }
}

for (const subject of subjects) {
    try {
        const savedSub = await createSubject(subject);
        console.log(savedSub);
    } catch (error) {
        console.log(error);
    }
}

for (const room of Rooms) {
    try {
        const savedRoom = await createClassroom(room);
        console.log(savedRoom);
    } catch (error) {
        console.log(error);
    }
}