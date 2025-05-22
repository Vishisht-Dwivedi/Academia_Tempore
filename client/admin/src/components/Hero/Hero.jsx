import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const Hero = ({ setChoice, choice }) => {
    const addTeacher = () => {
        setChoice("addTeacher")
    }
    const addClassroom = () => {
        setChoice("addClassroom")
    }
    const updateTeacher = () => {
        setChoice("updateTeacher")
    }

    const updateClassroom = () => {
        setChoice("updateClassroom")
    }
    return (
        <Box
            component="section"
            sx={{
                background: "linear-gradient(to bottom right, #0a1f44, #06142e)",
                color: "white",
                py: { xs: 10, md: 12 },
                px: { xs: 2, md: 6 },
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                textAlign: "center",
            }}
        >
            <Box maxWidth="md">
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mt={4} mb={2} flexWrap="wrap">
                    <Button variant="contained" onClick={updateTeacher}>
                        Update Teacher&apos;s Timetable
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "white",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "#0a1f44",
                            },
                        }}
                        onClick={updateClassroom}
                    >
                        Update Classroom&apos;s Timetable
                    </Button>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center" mt={4} mb={2} flexWrap="wrap">
                    <Button variant="contained" onClick={addTeacher}>
                        Add Teacher
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "white",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "#0a1f44",
                            },
                        }}
                        onClick={addClassroom}
                    >
                        Add Classroom&apos;s Timetable
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Hero;
