import React from 'react';
import './SearchForm.css';
import TeacherForm from './TeacherForm';
import ClassroomForm from './ClassroomForm';

function SearchForm({ choice, setChoice, setSelected, onSearchComplete }) {
  const back = () => {
    setChoice(0);
    setSelected(false);
  };

  return (
    <section className="form-group">
      <button className="back-btn" onClick={back}>Back</button>
      {choice === "teacher" ? (
        <TeacherForm onSearchComplete={onSearchComplete} />
      ) : (
        <ClassroomForm onSearchComplete={onSearchComplete} />
      )}
    </section>
  );
}

export default SearchForm;
