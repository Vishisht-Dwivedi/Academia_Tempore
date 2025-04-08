import React, { useState } from 'react';
import './SearchForm.css'
import TeacherForm from './TeacherForm';
import ClassroomForm from './ClassroomForm';
function SearchForm({ choice, setChoice, setSelected }) {
  const back = () => {
    setChoice(0);
    setSelected(false);
  }
  return (
    <section className="form-group">
      <button className="back-btn" onClick={back} >Back</button>
      {choice === "teacher" ? <TeacherForm /> : <ClassroomForm />}
    </section>
  );
}

export default SearchForm;