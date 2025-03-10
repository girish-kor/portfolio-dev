import React, { useState } from 'react';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import './App.scss';

const App = () => {
  const [section, setSection] = useState('about'); // Default active section

  const handleSectionChange = (newSection) => setSection(newSection);

  return (
    <div className="app">
      <Header onSectionChange={handleSectionChange} />
      <Body activeSection={section} />
      <Footer />
    </div>
  );
};

export default App;
