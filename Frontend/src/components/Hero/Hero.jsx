import React from "react"
import './Hero.css'
const Hero = ({ setSelected, setChoice }) => {

    const teachers = () => {
        setSelected(true);
        setChoice("teacher");
    }

    const classroom = () => {
        setSelected(true);
        setChoice("classroom");
    }
    return (
        <section className="hero">
            <div className="hero-content">
                <h2>IIIT Bhopal Timetable Management System</h2>
                <p>View, search, and manage academic schedules for students and faculty</p>
                <div className="hero-buttons">
                    <button id="hero-blue" onClick={teachers}>View Teacher's Timetable</button>
                    <button onClick={classroom}>View Classroom's Timetable</button>
                </div>
            </div>
        </section>
    )
}
export default Hero;