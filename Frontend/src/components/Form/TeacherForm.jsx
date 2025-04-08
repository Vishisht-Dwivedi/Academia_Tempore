import React, { useState } from "react";
const TeacherForm = () => {
    const [teacherName, setTeacherName] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedDepartments([...selectedDepartments, value]);
        } else {
            setSelectedDepartments(selectedDepartments.filter(dept => dept !== value));
        }
    };

    return (
        <div className="form-container">
            <input
                type="text"
                id="teacher-name"
                placeholder="Enter Teacher Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
            />

            <div className="checkbox-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="department"
                        value="CSE"
                        checked={selectedDepartments.includes('CSE')}
                        onChange={handleDepartmentChange}
                    /> CSE
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="department"
                        value="IT"
                        checked={selectedDepartments.includes('IT')}
                        onChange={handleDepartmentChange}
                    /> IT
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="department"
                        value="ECE"
                        checked={selectedDepartments.includes('ECE')}
                        onChange={handleDepartmentChange}
                    /> ECE
                </label>
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </div>
    );
}
export default TeacherForm