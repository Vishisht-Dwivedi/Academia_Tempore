import ClassroomsModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const checkForClashes = async (schedule) => {
    for (const day of weekdays) {
        const daySchedule = schedule[day] || {};

        for (const slot in daySchedule) {
            const lecture = daySchedule[slot];
            if (!lecture || !lecture.teacher) continue;

            const teacher = await TeacherModel.findById(lecture.teacher).populate("classes");
            if (!teacher) throw new Error(`Teacher not found: ${lecture.teacher}`);

            for (const classRef of teacher.classes) {
                const otherClass = await ClassroomsModel.findById(classRef._id);
                if (!otherClass?.schedule?.[day]) continue;

                const otherLecture = otherClass.schedule[day]?.[slot];
                if (otherLecture && String(otherLecture.teacher) === String(lecture.teacher)) {
                    throw new Error(
                        `Clash: ${teacher.name} already assigned at slot ${slot} on ${day} in ${otherClass.room}`
                    );
                }
            }
        }
    }
};
export { checkForClashes }