const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export default class Schedule {
    constructor(day, slotsArray = []) {
        if (!day) throw new Error("Schedule must have a day");

        const normalizedDay = day.trim().toLowerCase();
        if (!days.includes(normalizedDay)) {
            throw new Error(`${day} must be within weekdays`);
        }

        if (!Array.isArray(slotsArray)) {
            throw new Error("slotsArray must be an array");
        }

        this.day = normalizedDay;
        this.slots = slotsArray;
    }
}
