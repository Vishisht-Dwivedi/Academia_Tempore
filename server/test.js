import { getTeacherByID, getTeacherByCode } from "./services/read/readTeacher.js";
import { getSubjectByID, getSubjectByCodeAndType } from "./services/read/readSubject.js";
import { getClassroomByID, getClassroomByRoom } from "./services/read/readClassroom.js";
import mongoose from "mongoose";
import './registerModels.js'
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/timetable");
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
try {
    const RekhaKaushik = await getTeacherByCode("rk");
    for (const subject of RekhaKaushik.subjects) {
        const subjectDoc = await getSubjectByCodeAndType(subject);
    }
    for (const room of RekhaKaushik.classes) {
        const classroomDoc = await getClassroomByRoom(room.room);
        for (const day of classroomDoc.schedule) {
            for (const slot of day.slots) {
                console.log(slot);
            }
        }
    }
} catch (error) {
    console.log(error);
}