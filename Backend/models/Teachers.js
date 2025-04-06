export default class Teacher {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    getSchedule(allClassrooms) {
        const schedule = [];
        for (const classroom of allClassrooms) {
            const { room, schedule: dayWiseSchedule } = classroom;

            for (const day in dayWiseSchedule) {
                for (const entry of dayWiseSchedule[day]) {
                    if (entry.teacherCode === this.code) {
                        schedule.push({
                            room,
                            day,
                            time: entry.time,
                            subjectCode: entry.subjectCode,
                            subjectType: entry.subjectType
                        });
                    }
                }
            }
        }

        return schedule;
    }
}
