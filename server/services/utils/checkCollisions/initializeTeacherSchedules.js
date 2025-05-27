export class Schedule {
    constructor() {
        this.monday = new Set();
        this.tuesday = new Set();
        this.wednesday = new Set();
        this.thursday = new Set();
        this.friday = new Set();
    }
}

export function initializeTeacherSchedules(teacherCodes) {
    const teacherSchedules = new Map();
    for (const code of teacherCodes) {
        teacherSchedules.set(code, new Schedule());
    }
    return teacherSchedules;
}
