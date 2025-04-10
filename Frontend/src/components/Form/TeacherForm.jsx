import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

const TeacherForm = () => {
    const [teacherName, setTeacherName] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [teacherCode, setTeacherCode] = useState('');

    // Debouncing to not call api every keystroke
    const fetchTeachers = useMemo(() => debounce(async (name) => {
        try {
            const res = await fetch(`http://localhost:3000/teachers/allTeachers?name=${name}`);
            const data = await res.json();
            setTeacherOptions(data);
        } catch (err) {
            console.error("Error fetching teachers:", err);
            setTeacherOptions([]);
        }
    }, 300), []);

    // runs on every state change
    useEffect(() => {
        if (teacherName.trim() !== '') {
            fetchTeachers(teacherName);
        } else {
            setTeacherOptions([]);
            setTeacherCode('');
        }
    }, [teacherName, fetchTeachers]);

    useEffect(() => {
        const matched = teacherOptions.find(t => t.name === teacherName);
        if (matched) {
            setTeacherCode(matched.code);
        } else {
            setTeacherCode('');
        }
    }, [teacherName, teacherOptions]);

    return (
        <form
            action="http://localhost:3000/teachers"
            className="form-container"
            method="GET"
            target="_blank"
        >
            <input
                type="text"
                id="teacher-name"
                placeholder="Enter Teacher Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                list="name-suggestion-list"
                autoComplete="off"
                required
            />

            {/* Hidden input... */}
            <input
                type="hidden"
                name="code"
                value={teacherCode}
            />

            {/* Suggestions */}
            {teacherOptions.length > 0 && (
                <datalist id="name-suggestion-list">
                    {teacherOptions.map((teacher) => (
                        <option key={teacher.code} value={teacher.name}>
                            {teacher.name}
                        </option>
                    ))}
                </datalist>
            )}

            <button
                type="submit"
                className="submit-button"
                disabled={!teacherCode}
                title={!teacherCode ? "Please select a valid teacher name" : "Submit"}
            >
                Submit
            </button>
        </form>
    );
};

export default TeacherForm;
