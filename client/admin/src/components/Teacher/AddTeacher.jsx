import { TextField, Typography, Paper, Box, Button } from "@mui/material";
const AddTeacher = ({ setChoice }) => {
    const back = () => {
        setChoice(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const code = formData.get("code");
        try {
            const response = await fetch('/api/teachers/add', {
                method: 'POST',
                body: JSON.stringify({ name, code }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const message = await response.text();

            if (response.status === 409) {
                console.warn("Conflict:", message);
                alert(`Error: ${message}`);
            } else if (!response.ok) {
                console.error("Server Error:", message);
                alert(`Unexpected Error: ${message}`);
            } else {
                console.log("Success:", message);
                alert(`Success: ${message}`);
                setChoice(false);
            }
        } catch (error) {
            console.error("Fetch failed:", error);
            alert("Network error occurred.");
        }
    };
    return (
        <>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    minHeight: "100vh",
                    backgroundColor: "#0a1f44",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={back}
                    variant="contained"
                    sx={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        boxShadow: 3,
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#256029",
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    Back
                </Button>
                <Paper
                    elevation={6}
                    component="form"
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
                        Enter New Teacher's Name
                    </Typography>
                    <TextField
                        id="name"
                        name="name"
                        label="Enter Name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: 1,
                            mb: 3,
                            input: { textAlign: "center" },
                        }}
                    />
                    <TextField
                        id="code"
                        name="code"
                        label="Enter Code"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: 1,
                            mb: 3,
                            input: { textAlign: "center" },
                        }}
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
                        Submit
                    </Button>
                </Paper>
            </Box>

        </>
    )
}
export default AddTeacher; 