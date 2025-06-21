import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "./registerModels.js"
import isTeacherFree from "./services/utils/collisionDetection/isTeacherFree.js";
import { getTeacherByCode } from "./services/teacher/read.js";
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
try {
    const rk = await getTeacherByCode("rk");
    const rkFree = await isTeacherFree({ slot: 1, day: "Monday" }, rk.data);
} catch (error) {
    console.log(error);
} finally {
    process.exit(1);
}