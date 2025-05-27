import TeacherModel from "../../../models/Teachers.js";

//expects a saved classroom and will check if the assigned teacher already has a slot assigned at other classrooms
//if found it will remove that slot and throw an error
// Send leaned documents to avoid mongo id type errors
export default async function checkTeacherCollision(classroom) {
    const { _id, schedule } = classroom;

}
