import TeacherModel from "../../../models/Teachers.js";
import SubjectModel from "../../../models/Subjects.js";
export default async function addClassroomBacklinks(classroom) {
    const { _id, schedule = [] } = classroom;
    for (const day of schedule) {
        for (const slot of day.slots) {
            // backlink to teachers A
            await TeacherModel.findByIdAndUpdate(
                slot.teacher,
                { $addToSet: { classes: _id, subjects: slot.subject } }
            );
            // backlink to subjects 
            await SubjectModel.findByIdAndUpdate(
                slot.subject,
                { $addToSet: { teachers: slot.teacher } }
            );
        }
    }
}