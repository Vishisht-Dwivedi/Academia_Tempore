import classroomCodeToID from "./classroomCodeToID.js";
import subjectCodesToID from "./subjectCodesToID.js";
import teacherCodeToID from "./teacherCodesToID.js";
const codeToIDRegister = {
    Classroom: classroomCodeToID,
    Subject: subjectCodesToID,
    Teacher: teacherCodeToID
}
export default async function codeToID(option, array) {
    const handler = codeToIDRegister[option];
    if (handler) {
        return await handler(array);
    }
}