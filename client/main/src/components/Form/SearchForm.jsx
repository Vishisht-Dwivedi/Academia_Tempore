import TeacherForm from "./TeacherForm";
import ClassroomForm from "./ClassroomForm";
import { Box, Button } from "@mui/material";

function SearchForm({ choice, setChoice, setSelected, onSearchComplete }) {
  const back = () => {
    setChoice(0);
    setSelected(false);
  };

  return (
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
          top: 16,
          left: 16,
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

      {choice === "teacher" ? (
        <TeacherForm onSearchComplete={onSearchComplete} />
      ) : (
        <ClassroomForm onSearchComplete={onSearchComplete} />
      )}
    </Box>
  );
}

export default SearchForm;
