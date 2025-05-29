import Classrooms from "../constructors/classroomConstructor.js";
const sampleSchedule = [
    {
        day: "Monday",
        slots: [
            { slot: 1, subject: { name: "Math", code: "M101", type: "theory" }, teacher: "T001" },
            { slot: 2, subject: { name: "Physics", code: "P101", type: "lab" }, teacher: "T002" },
        ],
    },
];

describe("Classrooms Constructor", () => {
    test("should create a Classrooms instance with valid input", () => {
        const room = "tc-204";
        const classroom = new Classrooms(room, sampleSchedule);
        expect(classroom.room).toBe("TC-204");
        expect(classroom.schedule.length).toBe(1);
    });

    test("should throw error if room is missing", () => {
        expect(() => new Classrooms(null, sampleSchedule)).toThrow();
    });

    test("should throw error if schedule is not an array", () => {
        expect(() => new Classrooms("A1", {})).toThrow();
    });
});