import React from "react";
import {
    Autocomplete,
    TextField,
    Button,
    Paper,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useAutocompleteForm } from "../Utilities/Autocomplete";

const AutocompleteForm = ({
    label,
    placeholder,
    fetchSuggestionsUrl,
    submitUrl,
    extractMatch,
    extractKey,
    datalistId, // unused now, but keeping if needed for compatibility
    onSubmitData,
    buttonText = "Submit",
}) => {
    const {
        inputValue,
        setInputValue,
        options,
        selectedKey,
        setSelectedKey,
        isLoading,
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
        <Paper
            component="form"
            elevation={6}
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 400,
                p: 4,
                borderRadius: 3,
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid white",
                textAlign: "center",
            }}
        >
            <Typography variant="h6" color="white" mb={2} width="100%">
                {placeholder}
            </Typography>

            <Autocomplete
                freeSolo
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                options={options.map(extractMatch)}
                loading={isLoading}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={placeholder}
                        variant="outlined"
                        required
                        fullWidth
                        sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: 1,
                            mb: 3,
                            input: { textAlign: "center" },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    boxShadow: 3,
                    "&:hover": {
                        backgroundColor: "#1b5e20",
                        transform: "scale(1.03)",
                    },
                    transition: "all 0.3s",
                }}
            >
                {buttonText}
            </Button>
        </Paper>
    );
};

export default AutocompleteForm;
