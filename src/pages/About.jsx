import axios from 'axios';
import { useEffect, useState } from 'react';

export default function About({ user, repos }) {
  const [languages, setLanguages] = useState({});
  const [readme, setReadme] = useState('');
  const [softSkills, setSoftSkills] = useState([]);
  const [personalInterests, setPersonalInterests] = useState([]);

  useEffect(() => {
    const languageDistribution = {};
    repos.forEach((repo) => {
      Object.entries(repo.languages).forEach(([language, bytes]) => {
        languageDistribution[language] = (languageDistribution[language] || 0) + bytes;
      });
    });
    setLanguages(languageDistribution);
  }, [repos]);

  useEffect(() => {
    const fetchReadmeContent = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/girish-kor/girish-kor/main/README.md'
        );
        const content = response.data;

        const extractSection = (title) => {
          const regex = new RegExp(`### ${title}([\\s\\S]*?)(###|$)`);
          const match = content.match(regex);
          return match ? match[1].trim() : '';
        };

        setReadme(extractSection('About Me'));
        setSoftSkills(
          extractSection('Soft Skills')
            .split('\n')
            .map((skill) => skill.replace(/[-*]/, '').trim())
        );
        setPersonalInterests(
          extractSection('Personal Interests')
            .split('\n')
            .map((interest) => interest.replace(/[-*]/, '').trim())
        );
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    fetchReadmeContent();
  }, []);

  return (
    <div className="about-section">
      <div className="glass-card">
        <h2>About Me</h2>
        <div className="readme-content">{readme}</div>

        <div className="badges">
          <h2>Tech Skills</h2>
          {Object.keys(languages).map((language) => (
            <span key={language} className="badge">
              {language}
            </span>
          ))}
        </div>

        <div className="badges">
          <h2>Soft Skills</h2>
          {softSkills.map((skill, index) => (
            <span key={index} className="badge">
              {skill}
            </span>
          ))}
        </div>

        <div className="badges">
          <h2>Interests</h2>
          {personalInterests.map((interest, index) => (
            <span key={index} className="badge">
              <a
                href={`https://www.google.com/search?q=${interest}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {interest}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
