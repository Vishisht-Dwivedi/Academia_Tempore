import express from "express";
import { getAllTeachers, getTeacherSchedule, getTeacherByCode } from "../../services/teacher/teacherService.js";
const router = express.Router();

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