import express from "express";
import { addNewTeacher } from "../../services/teacher/teacherService.js";
const router = express.Router();

router.post("/add", async (req, res) => {
    const { name, code } = req.body;
    if (!name || !code) {
        return res.status(400).send("Missing name or code");
    }
    let addTeacherResponse;
    try {
        addTeacherResponse = await addNewTeacher({ name, code });
    } catch (error) {
        return res.status(409).send("Teacher with this name and code already exists");
    }
    return res.status(200).send(`Successfully added ${name}`);
})
export default router;