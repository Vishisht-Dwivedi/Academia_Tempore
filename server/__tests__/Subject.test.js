import Subject from "../constructors/subjectConstructor.js";

describe("Subject Constructor", () => {
    test("should construct with valid data", () => {
        const subject = new Subject("Mathematics", "M101", "theory", ["T001"]);
        expect(subject.code).toBe("m101");
        expect(subject.type).toBe("theory");
        expect(subject.teachers[0]).toBe("t001");
    });

    test("should throw error for invalid type", () => {
        expect(() => new Subject("Math", "M101", "workshop")).toThrow();
    });

    test("should throw error if teachers is not array", () => {
        expect(() => new Subject("Math", "M101", "theory", "T001")).toThrow();
    });
});