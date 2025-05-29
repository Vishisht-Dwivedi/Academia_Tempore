import Schedule from "../constructors/scheduleConstructor.js";

describe("Schedule Constructor", () => {
    test("should normalize day and create Slot instances", () => {
        const schedule = new Schedule("MONDAY", [
            { slot: 1, subject: { name: "Math", code: "M101", type: "theory" }, teacher: "T001" },
        ]);
        expect(schedule.day).toBe("monday");
        expect(schedule.slots.length).toBe(1);
    });

    test("should throw error for invalid weekday", () => {
        expect(() => new Schedule("sunday", [])).toThrow();
    });

    test("should throw error for duplicate slots", () => {
        expect(() =>
            new Schedule("Monday", [
                { slot: 1, subject: { name: "Math", code: "M101", type: "theory" }, teacher: "T001" },
                { slot: 1, subject: { name: "Phys", code: "P101", type: "lab" }, teacher: "T002" },
            ])
        ).toThrow();
    });
});