import express from "express";
import retrieveData from "../retrieveData.js";
const router = express.Router();

router.get("/allTeachers", async (req, res) => {
    const teacherName = req.query.name;
    if (!teacherName) {
        return res.status(400).send("Missing name in query");
    }
    res.send(retrieveData.getTeacherName(teacherName));
})

router.get("/", async (req, res) => {
    const teacherCode = req.query.code;
    if (!teacherCode) {
        return res.status(400).send("Missing code in query");
    }
    const schedule = await retrieveData.getTeacherSchedule(teacherCode);
    res.send(schedule);
});

export default router;
