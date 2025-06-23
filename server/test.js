import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "./registerModels.js"
import { getTeacherSchedule, getTeacherByCode } from "./services/teacher/read.js";
import { updateSchedule } from "./services/schedule/update.js";
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
try {
    const rk = await getTeacherByCode("rk");
    const rkSchedule = await getTeacherSchedule(rk._id);
    const res = await updateSchedule(rkSchedule);
    console.log(res);
} catch (error) {
    console.log(error);
} finally {
    process.exit(1);
}