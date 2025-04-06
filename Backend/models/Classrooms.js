export default class Classrooms {
    constructor(room, schedule) {
        this.room = room;
        this.schedule = schedule;
    }
    getClassroomSchedule() {
        return this.schedule;
    }
}
