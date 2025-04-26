import express from "express";
import { getAllTeachers, getTeacherSchedule, getTeacherByCode } from "../models/Teachers.js";
import mongoose from "mongoose";

const router = express.Router();

// Connect to DB
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}

// Route: GET /allTeachers?name=...
router.get("/allTeachers", async (req, res) => {
    const teacherName = req.query.name?.trim();
    if (!teacherName) {
        return res.status(400).send("Missing name in query");
    }

    try {
        const allTeachers = await getAllTeachers();
        const matches = allTeachers.filter((teacher) =>
            teacher.name?.toLowerCase().includes(teacherName.toLowerCase())
        );
        const returnedArray = matches.map(({ name, code }) => ({ name, code }));
        return res.json(returnedArray);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).send("Server error");
    }
});

// Route: GET /?code=...
router.get("/", async (req, res) => {
    const teacherCode = req.query.code?.trim();
    if (!teacherCode) {
        return res.status(400).send("Missing code in query");
    }

    try {
        const teacher = await getTeacherByCode(teacherCode);
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        const schedule = await getTeacherSchedule(teacherCode);
        return res.json(schedule);
    } catch (error) {
        console.error("Error generating schedule:", error);
        return res.status(500).send("Server error");
    }
});

export default router;
