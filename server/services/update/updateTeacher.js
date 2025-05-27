import TeacherModel from "../../models/Teachers";
import Teacher from "../../constructors/teacherConstructor.js"
//subject and classes must be array of subject codes
export default async function updateTeacher(teacherObj) {
    const { _id, name, code, subjects = [], classes = [] } = teacherObj;
    const validatedTeacher = new Teacher(name, code, classes, subjects);

}