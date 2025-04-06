import express from "express";
import retrieveData from "../retrieveData.js";
const router = express.Router();

router.get("/", (req, res) => {
    const teacherCode = req.query.code;
    if (!teacherCode) {
        return res.status(400).send("Missing teacherCode in query");
    }
    const schedule = retrieveData.getTeacherSchedule(teacherCode);
    res.send(schedule);
});

export default router;
