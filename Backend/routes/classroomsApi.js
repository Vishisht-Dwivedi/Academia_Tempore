import express from "express";
import retrieveData from "../retrieveData.js";
const router = express.Router();

router.get("/", (req, res) => {
    let room = req.query.room;
    if (!room) {
        res.status(400).send("Missing room number in query");
    }
    res.send(retrieveData.getClassroomSchedule(room));
})

export default router;