import addClassroomBacklinks from "./addClassroomBacklinks.js"
import addSubjectBacklinks from "./addSubjectBacklinks.js"
import addTeacherBacklinks from "./addTeacherBacklinks.js"
const backlinkRegister = {
    Classroom: addClassroomBacklinks,
    Subject: addSubjectBacklinks,
    Teacher: addTeacherBacklinks
}
export default async function addBacklink(option, object) {
    const handler = backlinkRegister[option];
    if (handler) await handler(object);
}