import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

const TeacherForm = ({ onSearchComplete }) => {
    const [teacherName, setTeacherName] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [teacherCode, setTeacherCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTeachers = useMemo(() =>
        debounce(async (name) => {
            try {
                const res = await fetch(`http://localhost:3000/teachers/allTeachers?name=${name}`);
                const data = await res.json();
                setTeacherOptions(data);
            } catch (err) {
                console.error("Error fetching teachers:", err);
                setTeacherOptions([]);
            }
        }, 300), []
    );

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teacherCode) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:3000/teachers?code=${teacherCode}`);
            const data = await res.json();
            onSearchComplete(data); // Pass data to App.jsx
        } catch (err) {
            console.error("Error fetching schedule:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
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

            <input
                type="hidden"
                name="code"
                value={teacherCode}
            />

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
                disabled={!teacherCode || isSubmitting}
                title={!teacherCode ? "Please select a valid teacher name" : "Submit"}
            >
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default TeacherForm;
