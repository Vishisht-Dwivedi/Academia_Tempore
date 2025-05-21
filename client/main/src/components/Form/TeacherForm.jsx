import React from "react";
import AutocompleteForm from "./AutocompleteForm";

const TeacherForm = ({ onSearchComplete }) => (
    <AutocompleteForm
        label="teacher-name"
        placeholder="Enter Teacher Name"
        fetchSuggestionsUrl="/api/teachers/allTeachers?name="
        submitUrl="/api/teachers"
        extractMatch={(teacher) => teacher.name}
        extractKey={(teacher) => teacher.code}
        datalistId="teacher-suggestions"
        onSubmitData={onSearchComplete}
        buttonText="Submit"
    />
);

export default TeacherForm;
