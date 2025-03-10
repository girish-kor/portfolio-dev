import React from 'react';
import './About.scss';
import { FaChessKnight, FaPaintBrush, FaCamera, FaCode } from 'react-icons/fa';

const About = () => {
  return (
    <section className="about-section" id="about">
      <h2>About Me</h2>

      <div className="about-intro">
        <p>
          Hi! I'm <strong>Girish Kor</strong>, a passionate <em>Full Stack Java Developer</em> and{' '}
          <em>React.js Developer</em> specializing in building modern, efficient, and interactive
          web applications.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>
            <FaCode /> Technical Skills
          </h3>
          <div className="tech-list">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>React.js</span>
            <span>SQL</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>TailwindCSS</span>
            <span>GitHub</span>
            <span>REST APIs</span>
          </div>
        </div>

        <div className="about-card">
          <h3>
            <FaCode /> Soft Skills
          </h3>
          <ul>
            <li>Problem-Solving & Logical Thinking</li>
            <li>Collaboration & Teamwork</li>
            <li>Adaptability & Continuous Learning</li>
            <li>Creativity & Analytical Thinking</li>
          </ul>
        </div>

        <div className="about-card full-width">
          <h3>
            <FaCode /> Personal Interests
          </h3>
          <div className="interest-grid">
            <div>
              <FaChessKnight /> Chess
            </div>
            <div>
              <FaPaintBrush /> Sketching
            </div>
            <div>📝 Poetry</div>
            <div>
              <FaCamera /> Photography
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
