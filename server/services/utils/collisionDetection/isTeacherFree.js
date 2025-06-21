import TeacherModel from "../../../models/Teachers.js";
export default async function isTeacherFree({ slot, day }, teacher) {
    const { _id, code, name } = teacher;
    const existingTeacher = await TeacherModel.findById(_id).populate("classes");
    if (!existingTeacher) {
        throw new Error(`Teacher with id: ${_id} code: ${code} & name: ${name} does not exist`);
    }
    for (const room of existingTeacher.classes) {
        console.log(room);
    }
}