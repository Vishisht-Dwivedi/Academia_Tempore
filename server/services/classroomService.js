import ClassroomsModel from "../models/Classrooms.js";
import TeacherModel from "../models/Teachers.js";

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

const addNewClassroom = async ({ room, schedule }) => {
    const existingClassroom = await ClassroomsModel.findOne({ room });
    if (existingClassroom) return existingClassroom;

    await checkForClashes(schedule);

    const newClassroom = new ClassroomsModel({ room, schedule });
    await newClassroom.save();

    const teacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = schedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) teacherIds.add(lecture.teacher.toString());
        });
    });

    for (const teacherId of teacherIds) {
        await TeacherModel.findByIdAndUpdate(teacherId, {
            $addToSet: { classes: newClassroom._id },
        });
    }

    return newClassroom;
};

const getAllClassrooms = async () => {
    return await ClassroomsModel.find({});
};

const getClassroom = async (room) => {
    return await ClassroomsModel.findOne({ room });
};

const getClassroomScheduleById = async (_id) => {
    return await ClassroomsModel.findById(_id);
};

const updateClassroom = async (room, newSchedule) => {
    const classroom = await ClassroomsModel.findOne({ room });
    if (!classroom) {
        throw new Error(`Classroom with room '${room}' not found`);
    }

    await checkForClashes(newSchedule);

    const oldTeacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = classroom.schedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) oldTeacherIds.add(lecture.teacher.toString());
        });
    });

    const newTeacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = newSchedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) newTeacherIds.add(lecture.teacher.toString());
        });
    });

    classroom.schedule = newSchedule;
    await classroom.save();

    for (const oldId of oldTeacherIds) {
        if (!newTeacherIds.has(oldId)) {
            await TeacherModel.findByIdAndUpdate(oldId, {
                $pull: { classes: classroom._id },
            });
        }
    }

    for (const newId of newTeacherIds) {
        await TeacherModel.findByIdAndUpdate(newId, {
            $addToSet: { classes: classroom._id },
        });
    }

    return classroom;
};

export {
    addNewClassroom,
    getAllClassrooms,
    getClassroom,
    getClassroomScheduleById,
    updateClassroom,
};
