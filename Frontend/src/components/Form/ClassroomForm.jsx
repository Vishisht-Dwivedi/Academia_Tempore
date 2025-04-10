import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

const ClassroomForm = () => {
    const [roomName, setRoomName] = useState('');
    const [roomOptions, setRoomOptions] = useState([]);

    const fetchRooms = useMemo(() =>
        debounce(async (room) => {
            try {
                const res = await fetch(`http://localhost:3000/classrooms/allClassrooms?room=${room}`);
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
            fetchRooms(roomName);
        } else {
            setRoomOptions([]);
        }
    }, [roomName, fetchRooms]);

    const isValid = roomOptions.some(r => r.room === roomName);

    return (
        <form
            action="http://localhost:3000/classrooms"
            className="form-container"
            method="GET"
            target="_blank"
        >
            <input
                type="text"
                id="room-name"
                name="room"
                placeholder="Enter Classroom Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                list="room-suggestion-list"
                autoComplete="off"
                required
            />

            {roomOptions.length > 0 && (
                <datalist id="room-suggestion-list">
                    {roomOptions.map((room) => (
                        <option key={room.room} value={room.room}>
                            {room.name}
                        </option>
                    ))}
                </datalist>
            )}

            <button
                type="submit"
                className="submit-button"
                disabled={!isValid}
                title={!isValid ? "Please select a valid room" : "Submit"}
            >
                Submit
            </button>
        </form>
    );
};

export default ClassroomForm;
