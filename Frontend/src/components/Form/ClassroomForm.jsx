import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

const ClassroomForm = ({ onSearchComplete }) => {
    const [roomName, setRoomName] = useState('');
    const [roomOptions, setRoomOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchRooms = useMemo(() =>
        debounce(async (room) => {
            try {
                const res = await fetch(`http://localhost:3000/classrooms/allClassrooms?room=${encodeURIComponent(room)}`);
                const data = await res.json();
                setRoomOptions(data);
            } catch (err) {
                console.error("Error fetching Classrooms:", err);
                setRoomOptions([]);
            }
        }, 300), []
    );

    useEffect(() => {
        if (roomName.trim() !== '') {
            fetchRooms(roomName.trim());
        } else {
            setRoomOptions([]);
        }
    }, [roomName, fetchRooms]);

    const isValid = roomOptions.some(r => r.room.toLowerCase() === roomName.trim().toLowerCase());

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:3000/classrooms?room=${encodeURIComponent(roomName.trim())}`);
            const data = await res.json();
            onSearchComplete(data); // Pass data to Schedule component
        } catch (err) {
            console.error("Error fetching classroom schedule:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                id="room-name"
                placeholder="Enter Classroom Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                list="room-suggestion-list"
                autoComplete="off"
                required
            />

            <datalist id="room-suggestion-list">
                {roomOptions.map((room) => (
                    <option key={room.room} value={room.room}>
                        {room.name || room.room}
                    </option>
                ))}
            </datalist>

            <button
                type="submit"
                className="submit-button"
                disabled={!isValid || isSubmitting}
                title={!isValid ? "Please select a valid room" : "Submit"}
            >
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default ClassroomForm;
