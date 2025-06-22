export default async function buildTeacherSubjectMap(schedule) {
    const teacherMap = new Map();
    for (const day of schedule) {
        for (const slot of day.slots) {
            console.log(slot);
        }
    }
}