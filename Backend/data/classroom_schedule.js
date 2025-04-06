import Schedule from "../models/Schedule.js";
import Classrooms from "../models/Classrooms.js";
export const classrooms = [
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
    new Classrooms("TC-201", {
        Wednesday: [
            new Schedule([14, 15, 16], "COA", "Practical", "AKS")
        ],
        Thursday: [
            ([14, 15, 16], "DBMS", "Practical", "VC")
        ],
        Friday: [
            ([14, 15, 16], "SE", "Practical", "RK")
        ]
    })
]