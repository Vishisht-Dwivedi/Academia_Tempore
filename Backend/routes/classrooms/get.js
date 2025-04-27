import express from "express";
import { getClassroom, getAllClassrooms } from "../../models/Classrooms.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let room = req.query.code;
        if (!room) {
            return res.status(400).send("Missing room number in query");
        }
        const classroom = await getClassroom(room);
        if (!classroom) {
            return res.status(404).send("Classroom not found");
        }
        const schedule = classroom.schedule;
        res.send(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/allClassrooms", async (req, res) => {
    try {
        const classroom = req.query.room;
        if (!classroom) {
            return res.status(400).send("Missing code in query");
        }
        const allRooms = await getAllClassrooms();
        const suggestions = allRooms.filter((room) =>
            room.room.toLowerCase().includes(classroom.toLowerCase())
        );
        const nameSuggestions = suggestions.map((suggestion) => {
            const { room } = suggestion;
            return { room };
        });
        res.send(nameSuggestions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

export default router;
