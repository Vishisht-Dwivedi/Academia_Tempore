import React from "react";
import { useAutocompleteForm } from "../Utilities/Autocomplete";

const SubmitButton = () => (
    <button type="submit" className="submit-button">
        Submit
    </button>
);

const AutocompleteForm = ({
    label,
    placeholder,
    fetchSuggestionsUrl,
    submitUrl,
    extractMatch,
    extractKey,
    datalistId,
    onSubmitData,
    buttonText = "Submit"
}) => {
    const {
        inputValue,
        setInputValue,
        options,
        selectedKey,
        isLoading
    } = useAutocompleteForm(fetchSuggestionsUrl, extractMatch, extractKey);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedKey) {
            alert("Please select a valid option from the suggestions.");
            return;
        }

        try {
            const res = await fetch(`${submitUrl}?code=${selectedKey}`);
            const data = await res.json();
            onSubmitData(data);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor={label}>{placeholder}</label>

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                list={datalistId}
                placeholder={placeholder}
                autoComplete="off"
                required
            />

            <input type="hidden" name="code" value={selectedKey} />

            {options.length > 0 && (
                <datalist id={datalistId}>
                    {options.map((opt) => (
                        <option key={extractKey(opt)} value={extractMatch(opt)} />
                    ))}
                </datalist>
            )}

            <SubmitButton />
        </form>
    );
};

export default AutocompleteForm;
