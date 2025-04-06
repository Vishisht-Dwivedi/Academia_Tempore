import Schedule from "../models/Schedule.js";
import Classrooms from "../models/Classrooms.js";
const Theory = [
    new Classrooms("TC-105", {
        Monday: [
            new Schedule([9], "ITC", "Theory", "SS"),
            new Schedule([10], "ADC", "Theory", "VB"),
            new Schedule([11], "DBMS", "Theory", "VC"),
            new Schedule([12], "COA", "Theory", "AKS")
        ],
        Tuesday: [
            new Schedule([9], "SE", "Theory", "RK")
        ],
        Wednesday: [
            new Schedule([9, 10], "COA", "Theory", "AKS"),
            new Schedule([11], "DBMS", "Theory", "VC"),
            new Schedule([12], "ITC", "Theory", "SS"),
            new Schedule([13], "SE", "Theory", "RK")
        ],
        Thursday: [
            new Schedule([9], "ITC", "Theory", "SS"),
            new Schedule([10, 11], "ADC", "Theory", "VB"),
            new Schedule([12], "DBMS", "Theory", "VC"),
            new Schedule([13], "SE", "Theory", "RK")
        ],
        Friday: [
            new Schedule([9], "ITC", "Theory", "SS"),
            new Schedule([10], "ADC", "Theory", "VB")
        ],
        Saturday: [
            new Schedule([9], "ED", "Theory", "NG")
        ]
    }),
    new Classrooms("TC-104", {
        Monday: [
            new Schedule([9], "COA", "Theory", "RC"),
            new Schedule([10], "ADC", "Theory", "VB"),
            new Schedule([11], "ITC", "Theory", "SS"),
            new Schedule([12], "DBMS", "Theory", "VC"),
            new Schedule([13], "SE", "Theory", "RK")
        ],
        Tuesday: [
            new Schedule([9], "COA", "Theory", "RC"),
            new Schedule([10], "ITC", "Theory", "SS")
        ],
        Wednesday: [
            new Schedule([9], "SE", "Theory", "RK"),
            new Schedule([10], "ITC", "Theory", "SS")
        ],
        Thursday: [
            new Schedule([9], "DBMS", "Theory", "VC"),
            new Schedule([10], "ADC", "Theory", "VB"),
            new Schedule([11], "ADC", "Theory", "VB"),
            new Schedule([12], "SE", "Theory", "RK"),
            new Schedule([13], "ITC", "Theory", "SS")
        ],
        Friday: [
            new Schedule([9], "DBMS", "Theory", "VC"),
            new Schedule([10], "COA", "Theory", "RC"),
            new Schedule([11], "ADC", "Theory", "VB")
        ],
        Saturday: [
            new Schedule([9], "ED", "Theory", "NG")
        ]
    })
]

const Labs = [
    new Classrooms("TC-101", {
        Tuesday: [
            new Schedule([11, 12], "SE", "Lab", "RK")
        ],
        Wednesday: [
            new Schedule([11, 12], "COA", "Lab", "RC")
        ]
    }),
    new Classrooms("TC-201", {
        Tuesday: [
            new Schedule([11, 12], "DBMS", "Lab", "VC"),
            new Schedule([14, 15], "COA", "Lab", "AKS")
        ],
        Friday: [
            new Schedule([9, 10], "SE", "Lab", "RK"),
            new Schedule([14, 15], "DBMS", "Lab", "VC")
        ]
    })
];
const Rooms = Theory.concat(Labs);
export default Rooms;