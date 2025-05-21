import express from "express";
import { updateClassroom } from "../../services/classroomService.js";
const router = express.Router();
router.put("/put", (req, res) => {
    const room = req.query.code;
    console.log(room);
    res.send("Hello");
})
export default router;