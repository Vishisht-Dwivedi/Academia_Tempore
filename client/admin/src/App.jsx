import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Hero from "./components/Hero/Hero.jsx"
import AddClassroom from "./components/Classroom/AddClassroom.jsx"
import AddTeacher from "./components/Teacher/AddTeacher.jsx"
import UpdateClassroom from "./components/Classroom/UpdateClassroom.jsx"
import UpdateTeacher from "./components/Teacher/UpdateTeacher.jsx"
function App() {
  const [choice, setChoice] = useState(false);
  return (<>
    <Navbar />
    {choiceSwitcher(choice, setChoice)}
    <Footer />
  </>
  )
}
const choiceSwitcher = (choice, setChoice) => {
  switch (choice) {
    case "addTeacher":
      return <AddTeacher setChoice={setChoice} />
    case "addClassroom":
      return <AddClassroom setChoice={setChoice} />
    case "updateTeacher":
      return <UpdateTeacher setChoice={setChoice} />
    case "updateClassroom":
      return <UpdateClassroom setChoice={setChoice} />
    default:
      return <Hero setChoice={setChoice} choice={choice} />
  }
}

export default App
