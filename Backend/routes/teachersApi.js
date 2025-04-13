import express from "express";
import { getAllTeachers, getTeacherSchedule } from "../models/Teachers.js"
import mongoose from "mongoose";
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
const router = express.Router();

router.get("/allTeachers", async (req, res) => {
    const teacherName = req.query.name;
    if (!teacherName) {
        return res.status(400).send("Missing name in query");
    }
    try {
        const allTeachers = await getAllTeachers();
        const matches = allTeachers.filter((teacher) =>
            teacher.name.trim().toLowerCase().includes(teacherName.trim().toLowerCase())
        );
        const returnedArray = matches.map((match) => {
            return { name: match.name, code: match.code }
        })
        return res.json(returnedArray);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).send("Server error");
    }
});

router.get("/", async (req, res) => {
    const teacherCode = req.query.code;
    if (!teacherCode) {
        return res.status(400).send("Missing code in query");
    }
    const schedule = await getTeacherSchedule(teacherCode);
    res.send(schedule);
});

export default router;
