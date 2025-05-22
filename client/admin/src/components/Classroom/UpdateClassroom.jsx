import { Button } from "@mui/material";
const UpdateClassroom = ({ setChoice }) => {
    const back = () => {
        setChoice(false);
    }
    return (
        <>
            update Classroom
            <Button
                onClick={back}
                variant="contained"
                sx={{
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
        </>
    )
}
export default UpdateClassroom;