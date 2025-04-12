import mongoose from "mongoose";
import { getAllClassrooms, getClassroom } from "./models/Classrooms.js";
import { getAllTeachers, getTeacherByCode } from "./models/Teachers.js";
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
const TeacherNames = async () => {
    const teachers = await getAllTeachers();
    return teachers.map((teacher) => {
        return { name: teacher.name, code: teacher.code };
    })
}

const Classrooms = async () => {
    return await getAllClassrooms();
}
TeacherNames();
Classrooms();

