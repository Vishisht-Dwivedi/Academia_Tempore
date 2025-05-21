import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const Hero = ({ setSelected, setChoice }) => {
    const teachers = () => {
        setSelected(true);
        setChoice("teacher");
    };

    const classroom = () => {
        setSelected(true);
        setChoice("classroom");
    };

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
                    IIIT Bhopal Timetable Management System
                </Typography>
                <Typography variant="body1" color="grey.300" gutterBottom>
                    View, search, and manage academic schedules for students and faculty
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mt={4} flexWrap="wrap">
                    <Button variant="contained" onClick={teachers}>
                        View Teacher&apos;s Timetable
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={classroom}
                        sx={{
                            borderColor: "white",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "#0a1f44",
                            },
                        }}
                    >
                        View Classroom&apos;s Timetable
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Hero;
