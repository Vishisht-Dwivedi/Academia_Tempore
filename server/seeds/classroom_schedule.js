import Schedule from "../constructors/scheduleConstructor.js";
import Classrooms from "../constructors/classroomConstructor.js";

const Theory = [
    new Classrooms("TC-105", {
        Monday: new Schedule([
            { time: [1], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2], subjectCode: "ADC", subjectType: "Theory", teacher: "VB" },
            { time: [3], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subjectCode: "COA", subjectType: "Theory", teacher: "AKS" }
        ]),
        Tuesday: new Schedule([
            { time: [1], subjectCode: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Wednesday: new Schedule([
            { time: [1, 2], subjectCode: "COA", subjectType: "Theory", teacher: "AKS" },
            { time: [3], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [5], subjectCode: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Thursday: new Schedule([
            { time: [1], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2, 3], subjectCode: "ADC", subjectType: "Theory", teacher: "VB" },
            { time: [4], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [5], subjectCode: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Friday: new Schedule([
            { time: [1], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2], subjectCode: "ADC", subjectType: "Theory", teacher: "VB" }
        ]),
        Saturday: new Schedule([
            { time: [1], subjectCode: "ED", subjectType: "Theory", teacher: "NG" }
        ])
    }),
    new Classrooms("TC-104", {
        Monday: new Schedule([
            { time: [1], subjectCode: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [3], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [4], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [5], subjectCode: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Tuesday: new Schedule([
            { time: [1], subjectCode: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [2], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Wednesday: new Schedule([
            { time: [1], subjectCode: "SE", subjectType: "Theory", teacher: "RK" },
            { time: [2], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Thursday: new Schedule([
            { time: [1], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subjectCode: "SE", subjectType: "Theory", teacher: "RK" },
            { time: [5], subjectCode: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Friday: new Schedule([
            { time: [1], subjectCode: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [2], subjectCode: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [3], subjectCode: "ADC", subjectType: "Theory", teacher: "VB" }
        ]),
        Saturday: new Schedule([
            { time: [1], subjectCode: "ED", subjectType: "Theory", teacher: "NG" }
        ])
    })
];

const Labs = [
    new Classrooms("TC-101", {
        Tuesday: new Schedule([
            { time: [3, 4], subjectCode: "SE", subjectType: "Lab", teacher: "RK" }
        ]),
        Wednesday: new Schedule([
            { time: [3, 4], subjectCode: "COA", subjectType: "Lab", teacher: "RC" }
        ])
    }),
    new Classrooms("TC-201", {
        Tuesday: new Schedule([
            { time: [3, 4], subjectCode: "DBMS", subjectType: "Lab", teacher: "VC" },
            { time: [6, 7], subjectCode: "COA", subjectType: "Lab", teacher: "AKS" }
        ]),
        Friday: new Schedule([
            { time: [1, 2], subjectCode: "SE", subjectType: "Lab", teacher: "RK" },
            { time: [6, 7], subjectCode: "DBMS", subjectType: "Lab", teacher: "VC" }
        ])
    })
];

const Rooms = Theory.concat(Labs);
export default Rooms;
