import React from "react";
import AutocompleteForm from "./AutocompleteForm";

const ClassroomForm = ({ onSearchComplete }) => (
    <AutocompleteForm
        label="classroom-name"
        placeholder="Enter Classroom"
        fetchSuggestionsUrl="/api/classrooms/allClassrooms?room="
        submitUrl="/api/classrooms"
        extractMatch={(room) => room.room}
        extractKey={(room) => room.room}
        datalistId="room-suggestions"
        onSubmitData={onSearchComplete}
        buttonText="Submit"
    />
);

export default ClassroomForm;
