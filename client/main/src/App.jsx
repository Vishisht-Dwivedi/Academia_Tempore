import { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import SearchForm from './components/Form/SearchForm.jsx';
import Footer from './components/Footer/Footer.jsx';
import Schedule from './components/Schedule/Schedule.jsx';
import './index.css';

function App() {
  const [selected, setSelected] = useState(false);
  const [choice, setChoice] = useState(0);
  const [scheduleData, setScheduleData] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleSearchComplete = (data) => {
    setScheduleData(data);      // data returned from SearchForm
    setShowSchedule(true);      // switch to Schedule view
  };

  return (
    <>
      <Navbar />
      <main>
        {showSchedule ? (
          <Schedule data={scheduleData} setScheduleData={setScheduleData} setShowSchedule={setShowSchedule} setSelected={setSelected} setChoice={setChoice} />
        ) : selected ? (
          <SearchForm
            choice={choice}
            setSelected={setSelected}
            setChoice={setChoice}
            onSearchComplete={handleSearchComplete}
          />
        ) : (
          <Hero setSelected={setSelected} setChoice={setChoice} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;