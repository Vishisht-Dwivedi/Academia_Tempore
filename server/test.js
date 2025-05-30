import dotenv from "dotenv";
dotenv.config();
import { getTeacherByID, getTeacherByCode, getAllTeachers } from "./services/read/readTeacher.js";
import { getSubjectByID, getSubjectByCodeAndType, getAllSubjects } from "./services/read/readSubject.js";
import { getClassroomByID, getClassroomByRoom, getAllClassroom } from "./services/read/readClassroom.js";
import mongoose from "mongoose";
import './registerModels.js'
import updateTeacher from "./services/update/updateTeacher.js";
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
} catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
// try {
//     const RekhaKaushik = await getTeacherByCode("rk");
//     for (const subject of RekhaKaushik.subjects) {
//         const subjectDoc = await getSubjectByCodeAndType(subject);
//     }
//     for (const room of RekhaKaushik.classes) {
//         const classroomDoc = await getClassroomByRoom(room.room);
//         for (const day of classroomDoc.schedule) {
//             for (const slot of day.slots) {
//                 // console.log(slot);
//             }
//         }
//     }
//     const allTeachers = await getAllTeachers();
//     console.log(allTeachers);
// } catch (error) {
//     console.log(error);
// // }
// try {
//     const classrooms = await getAllClassroom();
//     console.log(classrooms);
//     const subjects = await getAllSubjects();
//     console.log(subjects);
//     const teachers = await getAllTeachers();
//     console.log(teachers);
// } catch (error) {
//     console.log(error);
// }
// try {
//     const RekhaKaushik = await getTeacherByCode("rk");
//     const oldSubjects = RekhaKaushik.subjects;
//     const oldRooms = RekhaKaushik.classes;
//     console.log(oldSubjects);
//     console.log(oldRooms);
//     await updateTeacher(
//         {
//             _id: RekhaKaushik._id,
//             name: RekhaKaushik.name,
//             code: RekhaKaushik.code,
//             subjects: [oldSubjects[0]],
//             classes: [oldRooms[0]]
//         }
//     );
//     const newRK = await getTeacherByCode("rk");
//     console.log(newRK.subjects);
//     console.log(newRK.classes);
// } catch (error) {
//     console.log(error);
// }