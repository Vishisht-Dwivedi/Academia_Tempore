import Schedule from "../constructors/scheduleConstructor.js";
import Classrooms from "../constructors/classroomConstructor.js";
import Slot from "../constructors/slotConstructor.js";

const Theory = [
    new Classrooms("TC-105", [
        new Schedule("Monday", [
            new Slot(1, { code: "ITC", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", type: "Theory" }, "VB"),
            new Slot(3, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(4, { code: "COA", type: "Theory" }, "AKS"),
        ]),
        new Schedule("Tuesday", [
            new Slot(1, { code: "SE", type: "Theory" }, "RK"),
        ]),
        new Schedule("Wednesday", [
            new Slot(1, { code: "COA", type: "Theory" }, "AKS"),
            new Slot(2, { code: "COA", type: "Theory" }, "AKS"),
            new Slot(3, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(4, { code: "ITC", type: "Theory" }, "SS"),
            new Slot(5, { code: "SE", type: "Theory" }, "RK"),
        ]),
        new Schedule("Thursday", [
            new Slot(1, { code: "ITC", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", type: "Theory" }, "VB"),
            new Slot(3, { code: "ADC", type: "Theory" }, "VB"),
            new Slot(4, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(5, { code: "SE", type: "Theory" }, "RK"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "ITC", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", type: "Theory" }, "VB"),
        ]),
    ]),

    new Classrooms("TC-104", [
        new Schedule("Monday", [
            new Slot(1, { code: "COA", type: "Theory" }, "RC"),
            new Slot(3, { code: "ITC", type: "Theory" }, "SS"),
            new Slot(4, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(5, { code: "SE", type: "Theory" }, "RK"),
        ]),
        new Schedule("Tuesday", [
            new Slot(1, { code: "COA", type: "Theory" }, "RC"),
            new Slot(2, { code: "ITC", type: "Theory" }, "SS"),
        ]),
        new Schedule("Wednesday", [
            new Slot(1, { code: "SE", type: "Theory" }, "RK"),
            new Slot(2, { code: "ITC", type: "Theory" }, "SS"),
        ]),
        new Schedule("Thursday", [
            new Slot(1, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(4, { code: "SE", type: "Theory" }, "RK"),
            new Slot(5, { code: "ITC", type: "Theory" }, "SS"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "DBMS", type: "Theory" }, "VC"),
            new Slot(2, { code: "COA", type: "Theory" }, "RC"),
            new Slot(3, { code: "ADC", type: "Theory" }, "VB"),
        ]),
    ]),
];

const Labs = [
    new Classrooms("TC-101", [
        new Schedule("Tuesday", [
            new Slot(3, { code: "SE", type: "Lab" }, "RK"),
            new Slot(4, { code: "SE", type: "Lab" }, "RK"),
        ]),
        new Schedule("Wednesday", [
            new Slot(3, { code: "COA", type: "Lab" }, "RC"),
            new Slot(4, { code: "COA", type: "Lab" }, "RC"),
        ]),
    ]),

    new Classrooms("TC-201", [
        new Schedule("Tuesday", [
            new Slot(3, { code: "DBMS", type: "Lab" }, "VC"),
            new Slot(4, { code: "DBMS", type: "Lab" }, "VC"),
            new Slot(6, { code: "COA", type: "Lab" }, "AKS"),
            new Slot(7, { code: "COA", type: "Lab" }, "AKS"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "SE", type: "Lab" }, "RK"),
            new Slot(2, { code: "SE", type: "Lab" }, "RK"),
            new Slot(6, { code: "DBMS", type: "Lab" }, "VC"),
            new Slot(7, { code: "DBMS", type: "Lab" }, "VC"),
        ]),
    ]),
];
const Rooms = Theory.concat(Labs);
Rooms.forEach((room) => {
    const schedule = room.schedule;
    schedule.forEach((slot) => {
        console.log(slot.slots);
    })
})
export default Rooms;
