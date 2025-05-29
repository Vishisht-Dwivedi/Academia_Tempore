import Slot from "../constructors/slotConstructor.js";

describe("Slot Constructor", () => {
    const subject = { name: "Math", code: "M101", type: "theory" };

    test("should create Slot instance correctly", () => {
        const slot = new Slot(2, subject, "T001");
        expect(slot.slot).toBe(2);
        expect(slot.teacher).toBe("t001");
        expect(slot.subject.code).toBe("m101");
    });

    test("should throw error if slot is out of range", () => {
        expect(() => new Slot(0, subject, "T001")).toThrow();
        expect(() => new Slot(9, subject, "T001")).toThrow();
    });

    test("should throw error for missing fields", () => {
        expect(() => new Slot(2, {}, "T001")).toThrow();
    });
});