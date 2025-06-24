import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "./registerModels.js"
import { getTeacherSchedule, getTeacherByCode } from "./services/teacher/read.js";
import { updateSchedule } from "./services/schedule/update.js";
import deleteTeacher from "./services/teacher/delete.js";
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
try {
    const ss = await getTeacherByCode("ss");
    const deletedSS = await deleteTeacher(ss._id);
    console.log(deletedSS);
} catch (error) {
    console.log(error);
} finally {
    process.exit(1);
}