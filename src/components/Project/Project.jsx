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

// Constants
const GITHUB_USERNAME = 'girish-kor';
const PER_PAGE = 20;
const GITHUB_TOKEN = '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'; // Make sure this is kept secure!
const COLORS = [
  'rgba(0, 196, 159, 0.5)', // Glassy Teal
  'rgba(255, 187, 40, 0.5)', // Glassy Yellow
  'rgba(255, 68, 68, 0.5)', // Glassy Red
  'rgba(170, 102, 204, 0.5)', // Glassy Purple
  'rgba(0, 136, 254, 0.5)', // Glassy Blue
  'rgba(255, 128, 66, 0.5)', // Glassy Orange
];

// Axios instance with Authorization
const axiosInstance = axios.create({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

const Project = () => {
  const [repos, setRepos] = useState([]);
  const [languagesData, setLanguagesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Repositories with Authorization
  const fetchRepos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosInstance.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${PER_PAGE}&sort=pushed`
      );

      // Check the rate limit remaining from the response headers
      console.log('Rate Limit Remaining:', res.headers['x-ratelimit-remaining']);
      
      setRepos(res.data);
    } catch (err) {
      console.error('Error fetching repositories:', err.response || err);
      setError('Failed to fetch repositories. Check API limits or token.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Languages for each Repo with Authorization
  const fetchLanguages = async (repoName) => {
    try {
      const res = await axiosInstance.get(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`
      );
      
      // Log the languages data for debugging
      console.log('Fetched Languages for', repoName, res.data);

      setLanguagesData((prev) => ({
        ...prev,
        [repoName]: res.data,
      }));
    } catch (err) {
      console.error(`Error fetching languages for ${repoName}:`, err.response || err);
    }
  };

  // Load Repositories and their Languages
  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    repos.forEach((repo) => {
      if (!languagesData[repo.name]) {
        fetchLanguages(repo.name);
      }
    });
  }, [repos, languagesData]);

  // Convert language data to percentages
  const getLanguagePercentages = (languages) => {
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(languages).map(([lang, bytes]) => ({
      name: lang,
      value: Number(((bytes / total) * 100).toFixed(2)),
    }));
  };

  return (
    <section className="project-section" id="projects">
      <h2>🚀 My Projects</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading projects...</p>}

      <div className="projects-grid">
        {repos.map((repo) => {
          const languageData = languagesData[repo.name];
          const pieData = languageData ? getLanguagePercentages(languageData) : [];

          return (
            <div className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description available.'}</p>

              {pieData.length > 0 && (
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
              )}

              {/* Repo Stats */}
              <div className="repo-stats">
                <span>
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span>
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span>
                  <FaExclamationCircle /> {repo.open_issues_count}
                </span>
                <span>
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>

              {/* Repo Links */}
              <div className="project-links">
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Source Code
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Project;
