import Subject from "../constructors/subjectConstructor.js";

const subjects = [
    new Subject("ITC", "Introduction to Computing", "Theory", []),
    new Subject("ADC", "Analog and Digital Circuits", "Theory", []),
    new Subject("DBMS", "Database Management Systems", "Theory", []),
    new Subject("COA", "Computer Organization and Architecture", "Theory", []),
    new Subject("SE", "Software Engineering", "Theory", []),
    new Subject("ED", "Engineering Drawing", "Theory", []),

    new Subject("SE", "Software Engineering Lab", "Lab", []),
    new Subject("COA", "Computer Organization and Architecture Lab", "Lab", []),
    new Subject("DBMS", "Database Management Systems Lab", "Lab", [])
];

export default subjects;
