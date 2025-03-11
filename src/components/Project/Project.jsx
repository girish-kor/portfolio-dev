import React, { useEffect, useState } from 'react';
import './Project.scss';
import axios from 'axios';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCodeBranch,
  FaStar,
  FaExclamationCircle,
  FaEye,
} from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const GITHUB_USERNAME = 'girish-kor';
const PER_PAGE = 20;
const COLORS = [
  'rgba(0, 196, 159, 0.5)',
  'rgba(255, 187, 40, 0.5)',
  'rgba(255, 68, 68, 0.5)',
  'rgba(170, 102, 204, 0.5)',
  'rgba(0, 136, 254, 0.5)',
  'rgba(255, 128, 66, 0.5)',
];

const Project = () => {
  const [repos, setRepos] = useState([]);
  const [languagesData, setLanguagesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const fetchRepos = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${PER_PAGE}&sort=pushed`
      );

      setRepos(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError('Failed to fetch repositories. Try refreshing or check the username.');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async (repoName) => {
    try {
      const res = await axios.get(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
        token ? { headers: { Authorization: `token ${token}` } } : {}
      );

      setLanguagesData((prev) => ({
        ...prev,
        [repoName]: res.data,
      }));
    } catch (err) {
      console.error(`Error fetching languages for ${repoName}:`, err);
      setLanguagesData((prev) => ({
        ...prev,
        [repoName]: {},
      }));
    }
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    const newToken = e.target.elements.token.value.trim();
    setToken(newToken);
    localStorage.setItem('github_token', newToken);
    fetchRepos();
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
      setToken(savedToken);
    }
    fetchRepos();
  }, []);

  useEffect(() => {
    repos.slice(0, 5).forEach((repo) => {
      if (!languagesData[repo.name]) {
        fetchLanguages(repo.name);
      }
    });
  }, [repos]);

  const getLanguagePercentages = (languages) => {
    if (!languages || Object.keys(languages).length === 0) {
      return [];
    }

    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(languages)
      .map(([lang, bytes]) => ({
        name: lang,
        value: Number(((bytes / total) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const renderFallbackProjects = () => {
    const fallbackProjects = [
      {
        id: 'fallback1',
        name: 'Portfolio Website',
        description: 'My personal portfolio website built with React',
        languages: { JavaScript: 70, HTML: 20, CSS: 10 },
      },
      {
        id: 'fallback2',
        name: 'E-commerce Platform',
        description: 'A full-stack e-commerce application with payment integration',
        languages: { JavaScript: 60, Python: 30, CSS: 10 },
      },
    ];

    return fallbackProjects.map((project) => (
      <div className="project-card" key={project.id}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="responsive-pie-chart">
          <PieChart width={320} height={180}>
            <Pie
              data={Object.entries(project.languages).map(([name, value]) => ({ name, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="60%"
              label={({ name, value }) => `${name}: ${value}%`}
              stroke="black"
              strokeWidth={1}
            >
              {Object.keys(project.languages).map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="project-links">
          <a href="#" className="code-link">
            <FaGithub /> Source Code
          </a>
        </div>
      </div>
    ));
  };

  return (
    <section className="project-section" id="projects">
      <h2>🚀 My Projects</h2>

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <form onSubmit={handleTokenSubmit} className="token-form">
            <input
              type="text"
              name="token"
              placeholder="Enter GitHub token (optional)"
              className="token-input"
            />
            <button type="submit">Use Token</button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="loading-text">Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {repos.length > 0
            ? repos.map((repo) => {
                const languageData = languagesData[repo.name];
                const pieData = languageData ? getLanguagePercentages(languageData) : [];

                return (
                  <div className="project-card" key={repo.id}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description || 'No description available.'}</p>

                    {pieData.length > 0 ? (
                      <div className="responsive-pie-chart">
                        <PieChart width={320} height={180}>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="60%"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            stroke="black"
                            strokeWidth={1}
                          >
                            {pieData.map((_, idx) => (
                              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </div>
                    ) : (
                      <div className="language-placeholder">Loading language data...</div>
                    )}

                    <div className="repo-stats">
                      <span title="Stars">
                        <FaStar /> {repo.stargazers_count || 0}
                      </span>
                      <span title="Forks">
                        <FaCodeBranch /> {repo.forks_count || 0}
                      </span>
                      <span title="Issues">
                        <FaExclamationCircle /> {repo.open_issues_count || 0}
                      </span>
                      <span title="Watchers">
                        <FaEye /> {repo.watchers_count || 0}
                      </span>
                    </div>

                    <div className="project-links">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="demo-link"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="code-link"
                      >
                        <FaGithub /> Source Code
                      </a>
                    </div>
                  </div>
                );
              })
            : renderFallbackProjects()}
        </div>
      )}
    </section>
  );
};

export default Project;
