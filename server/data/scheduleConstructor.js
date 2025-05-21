export default class Schedule {
    constructor(daySchedule) {
        const schedule = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null
        }
        daySchedule.forEach((slot) => {
            slot.time.forEach((t) => {
                if (schedule[t]) {
                    throw new Error("Slot is already assigned");
                } else {
                    schedule[t] = {
                        subjectCode: slot.subjectCode,
                        subjectType: slot.subjectType,
                        teacher: slot.teacher
                    }
                }
            })
        });
        return schedule;
    }
}