import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// This resolves the current file’s directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the .env at project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import mongoose from "mongoose";
import createTeacher from "../services/create/createTeacher.js";
import createSubject from "../services/create/createSubject.js";
import createClassroom from "../services/create/createClassroom.js";
import teachers from "./teachers.js";
import subjects from "./subjects.js";
import Rooms from "./classroom_schedule.js";

async function connectAndClearDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await mongoose.connection.db.dropDatabase();
        console.log("Connected to Database and cleared database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}

async function seedTeachers() {
    for (const teacher of teachers) {
        try {
            const savedTeacher = await createTeacher(teacher);
            console.log(`Created teacher: ${savedTeacher.code}`);
        } catch (error) {
            console.error(`Error creating teacher (${teacher.code}):`, error.message);
        }
    }
}

async function seedSubjects() {
    for (const subject of subjects) {
        try {
            const savedSubject = await createSubject(subject);
            console.log(`Created subject: ${savedSubject.code}`);
        } catch (error) {
            console.error(`Error creating subject (${subject.code}):`, error.message);
        }
    }
}

async function seedClassrooms() {
    for (const room of Rooms) {
        try {
            const response = await createClassroom(room);
            if (response.status === "OK") {
                console.log(`Created classroom: ${response.classroom.room}`);
            } else {
                console.warn(`Classroom collision for room ${room.room}:`, response.message);
            }
        } catch (error) {
            console.error(`Error creating classroom (${room.room}):`, error.message);
        }
    }
}

async function seed() {
    await connectAndClearDB();
    await seedTeachers();
    await seedSubjects();
    await seedClassrooms();
    mongoose.disconnect();
}

seed();