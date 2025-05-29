import Teacher from "../constructors/teacherConstructor.js";

describe("Teacher Constructor", () => {
    test("should create Teacher instance", () => {
        const teacher = new Teacher("Alan Smith", "T001", ["tc-204"], [
            { name: "Math", code: "M101", type: "theory" },
        ]);
        expect(teacher.code).toBe("t001");
        expect(teacher.name).toBe("Alan Smith");
        expect(teacher.classes[0]).toBe("TC-204");
        expect(teacher.subjects.length).toBe(1);
    });

    test("should throw error if name or code is missing", () => {
        expect(() => new Teacher(null, "T001")).toThrow();
        expect(() => new Teacher("Alan", null)).toThrow();
    });

    test("should throw error if classes or subjects is not an array", () => {
        expect(() => new Teacher("Alan", "T001", {}, [])).toThrow();
        expect(() => new Teacher("Alan", "T001", [], {})).toThrow();
    });
});