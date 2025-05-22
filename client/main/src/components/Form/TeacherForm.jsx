import AutocompleteForm from "./AutocompleteForm";

const TeacherForm = ({ onSearchComplete }) => (
    <AutocompleteForm
        placeholder="Enter Teacher Name"
        fetchSuggestionsUrl="/api/teachers/allTeachers?name="
        submitUrl="/api/teachers"
        extractMatch={(teacher) => teacher.name}
        extractKey={(teacher) => teacher.code}
        onSubmitData={onSearchComplete}
        buttonText="Submit"
    />
);

export default TeacherForm;
