import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx'
import SearchForm from './components/Form/SearchForm.jsx';
import React from 'react';
import Footer from './components/Footer/Footer.jsx';
import './index.css';


function App() {
  const [selected, setSelected] = useState(false);
  const [choice, setChoice] = useState(0);
  return (
    <>
      <Navbar />
      <main>
        {selected ?
          <SearchForm choice={choice} setSelected={setSelected} setChoice={setChoice} /> :
          <Hero setSelected={setSelected} setChoice={setChoice} />
        }
      </main>
      <Footer />
    </>
  );
}

export default App
