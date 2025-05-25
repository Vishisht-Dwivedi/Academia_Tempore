import { useState } from "react";
import { Button, Box, Paper } from "@mui/material";
import ClassroomNameForm from "./ClassroomNameForm";
const AddClassroom = ({ setChoice }) => {
    const [classroom, setClassroom] = useState(null);
    return (
        <>
            {!classroom && <ClassroomNameForm setChoice={setChoice} setClassroom={setClassroom} />}
        </>
    )
}
export default AddClassroom;