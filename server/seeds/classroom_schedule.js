import Schedule from "../constructors/scheduleConstructor.js";
import Classrooms from "../constructors/classroomConstructor.js";

const Theory = [
    new Classrooms("TC-105", {
        Monday: new Schedule([
            { time: [1], subject: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2], subject: "ADC", subjectType: "Theory", teacher: "VB" },
            { time: [3], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subject: "COA", subjectType: "Theory", teacher: "AKS" }
        ]),
        Tuesday: new Schedule([
            { time: [1], subject: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Wednesday: new Schedule([
            { time: [1, 2], subject: "COA", subjectType: "Theory", teacher: "AKS" },
            { time: [3], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subject: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [5], subject: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Thursday: new Schedule([
            { time: [1], subject: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2, 3], subject: "ADC", subjectType: "Theory", teacher: "VB" },
            { time: [4], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [5], subject: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Friday: new Schedule([
            { time: [1], subject: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [2], subject: "ADC", subjectType: "Theory", teacher: "VB" }
        ]),
        Saturday: new Schedule([
            { time: [1], subject: "ED", subjectType: "Theory", teacher: "NG" }
        ])
    }),
    new Classrooms("TC-104", {
        Monday: new Schedule([
            { time: [1], subject: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [3], subject: "ITC", subjectType: "Theory", teacher: "SS" },
            { time: [4], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [5], subject: "SE", subjectType: "Theory", teacher: "RK" }
        ]),
        Tuesday: new Schedule([
            { time: [1], subject: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [2], subject: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Wednesday: new Schedule([
            { time: [1], subject: "SE", subjectType: "Theory", teacher: "RK" },
            { time: [2], subject: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Thursday: new Schedule([
            { time: [1], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [4], subject: "SE", subjectType: "Theory", teacher: "RK" },
            { time: [5], subject: "ITC", subjectType: "Theory", teacher: "SS" }
        ]),
        Friday: new Schedule([
            { time: [1], subject: "DBMS", subjectType: "Theory", teacher: "VC" },
            { time: [2], subject: "COA", subjectType: "Theory", teacher: "RC" },
            { time: [3], subject: "ADC", subjectType: "Theory", teacher: "VB" }
        ]),
        Saturday: new Schedule([
            { time: [1], subject: "ED", subjectType: "Theory", teacher: "NG" }
        ])
    })
];

const Labs = [
    new Classrooms("TC-101", {
        Tuesday: new Schedule([
            { time: [3, 4], subject: "SE", subjectType: "Lab", teacher: "RK" }
        ]),
        Wednesday: new Schedule([
            { time: [3, 4], subject: "COA", subjectType: "Lab", teacher: "RC" }
        ])
    }),
    new Classrooms("TC-201", {
        Tuesday: new Schedule([
            { time: [3, 4], subject: "DBMS", subjectType: "Lab", teacher: "VC" },
            { time: [6, 7], subject: "COA", subjectType: "Lab", teacher: "AKS" }
        ]),
        Friday: new Schedule([
            { time: [1, 2], subject: "SE", subjectType: "Lab", teacher: "RK" },
            { time: [6, 7], subject: "DBMS", subjectType: "Lab", teacher: "VC" }
        ])
    })
];

const Rooms = Theory.concat(Labs);
export default Rooms;
