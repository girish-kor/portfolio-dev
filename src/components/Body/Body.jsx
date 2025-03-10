import React from 'react';
import './Body.scss';
import About from '../About/About';
import Project from '../Project/Project';
import Contact from '../Contact/Contact';

const Body = ({ activeSection }) => {
  return (
    <main className="body-container">
      {activeSection === 'about' && (
        <div className="animated-section">
          <About />
        </div>
      )}
      {activeSection === 'projects' && (
        <div className="animated-section">
          <Project />
        </div>
      )}
      {activeSection === 'contact' && (
        <div className="animated-section">
          <Contact />
        </div>
      )}
    </main>
  );
};

export default Body;
