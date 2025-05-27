export function populateClassroomSchedule(schedule, teacherSchedules) {
    for (const day of schedule) {
        for (const slot of day.slots) {
            const scheduleMap = teacherSchedules.get(slot.teacher.code);
            scheduleMap[day.day].add(slot.slot);
        }
    }
}
