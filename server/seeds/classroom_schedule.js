import Schedule from "../constructors/scheduleConstructor.js";
import Classrooms from "../constructors/classroomConstructor.js";
import Slot from "../constructors/slotConstructor.js";

const Theory = [
    new Classrooms("TC-105", [
        new Schedule("Monday", [
            new Slot(1, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", name: "Analog and Digital Circuits", type: "Theory" }, "VB"),
            new Slot(3, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(4, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "AKS"),
        ]),
        new Schedule("Tuesday", [
            new Slot(1, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
        ]),
        new Schedule("Wednesday", [
            new Slot(1, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "AKS"),
            new Slot(2, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "AKS"),
            new Slot(3, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(4, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
            new Slot(5, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
        ]),
        new Schedule("Thursday", [
            new Slot(1, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", name: "Analog and Digital Circuits", type: "Theory" }, "VB"),
            new Slot(3, { code: "ADC", name: "Analog and Digital Circuits", type: "Theory" }, "VB"),
            new Slot(4, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(5, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
            new Slot(2, { code: "ADC", name: "Analog and Digital Circuits", type: "Theory" }, "VB"),
        ]),
    ]),

    new Classrooms("TC-104", [
        new Schedule("Monday", [
            new Slot(1, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "RC"),
            new Slot(3, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
            new Slot(4, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(5, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
        ]),
        new Schedule("Tuesday", [
            new Slot(1, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "RC"),
            new Slot(2, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
        ]),
        new Schedule("Wednesday", [
            new Slot(1, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
            new Slot(2, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
        ]),
        new Schedule("Thursday", [
            new Slot(1, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(4, { code: "SE", name: "Software Engineering", type: "Theory" }, "RK"),
            new Slot(5, { code: "ITC", name: "Introduction to Computing", type: "Theory" }, "SS"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "DBMS", name: "Database Management Systems", type: "Theory" }, "VC"),
            new Slot(2, { code: "COA", name: "Computer Organization and Architecture", type: "Theory" }, "RC"),
            new Slot(3, { code: "ADC", name: "Analog and Digital Circuits", type: "Theory" }, "VB"),
        ]),
    ]),
];

const Labs = [
    new Classrooms("TC-101", [
        new Schedule("Tuesday", [
            new Slot(3, { code: "SE", name: "Software Engineering", type: "Lab" }, "RK"),
            new Slot(4, { code: "SE", name: "Software Engineering", type: "Lab" }, "RK"),
        ]),
        new Schedule("Wednesday", [
            new Slot(3, { code: "COA", name: "Computer Organization and Architecture", type: "Lab" }, "RC"),
            new Slot(4, { code: "COA", name: "Computer Organization and Architecture", type: "Lab" }, "RC"),
        ]),
    ]),

    new Classrooms("TC-201", [
        new Schedule("Tuesday", [
            new Slot(3, { code: "DBMS", name: "Database Management Systems", type: "Lab" }, "VC"),
            new Slot(4, { code: "DBMS", name: "Database Management Systems", type: "Lab" }, "VC"),
            new Slot(6, { code: "COA", name: "Computer Organization and Architecture", type: "Lab" }, "AKS"),
            new Slot(7, { code: "COA", name: "Computer Organization and Architecture", type: "Lab" }, "AKS"),
        ]),
        new Schedule("Friday", [
            new Slot(1, { code: "SE", name: "Software Engineering", type: "Lab" }, "RK"),
            new Slot(2, { code: "SE", name: "Software Engineering", type: "Lab" }, "RK"),
            new Slot(6, { code: "DBMS", name: "Database Management Systems", type: "Lab" }, "VC"),
            new Slot(7, { code: "DBMS", name: "Database Management Systems", type: "Lab" }, "VC"),
        ]),
    ]),
];

const Rooms = Theory.concat(Labs);
export default Rooms;
