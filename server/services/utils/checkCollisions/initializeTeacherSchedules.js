export class Schedule {
    constructor() {
        return {
            monday: new Set(),
            tuesday: new Set(),
            wednesday: new Set(),
            thursday: new Set(),
            friday: new Set()
        };
    }
}

export function initializeTeacherSchedules(teacherCodes) {
    const teacherSchedules = new Map();
    for (const code of teacherCodes) {
        teacherSchedules.set(code, new Schedule());
    }
    return teacherSchedules;
}
