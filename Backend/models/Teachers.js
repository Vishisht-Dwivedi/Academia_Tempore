export default class Teacher {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    getSchedule(allClassrooms) {
        const DayWiseSchedule = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
        for (const classroom of allClassrooms) {
            const { room, schedule } = classroom;
            for (const day in schedule) {
                for (const entry of schedule[day]) {
                    if (entry.teacherCode === this.code) {
                        DayWiseSchedule[day].push({
                            room,
                            time: entry.time,
                            subjectCode: entry.subjectCode,
                            subjectType: entry.subjectType
                        });
                    }
                }
            }
        }

        return DayWiseSchedule;
    }
}
