import React, { useState } from "react";
const ClassroomForm = () => {
    const [classroom, setClassroom] = useState('');
    return (
        <div className="form-container">
            <input
                type="text"
                id="teacher-name"
                placeholder="Enter Classroom"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
            />
            <button type="submit" className="submit-button">Submit</button>
        </div>
    );
}
export default ClassroomForm