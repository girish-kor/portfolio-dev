import React, { useEffect, useState } from 'react';
import './Project.scss';
import axios from 'axios';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCodeBranch,
  FaStar,
  FaExclamationCircle,
  FaCircle,
  FaClock,
} from 'react-icons/fa';

const Project = () => {
  const [repoData, setRepoData] = useState({});

  const projects = [
    {
      title: 'Web-Shop',
      description:
        'A responsive e-commerce platform with modern UI, backend integration, and seamless user experience.',
      link: 'https://web-shop-hu5w.onrender.com/',
      github: 'https://github.com/girish-kor/web-shop',
      repo: 'girish-kor/web-shop',
    },
  ];

  useEffect(() => {
    const fetchRepoData = async () => {
      const data = {};
      await Promise.all(
        projects.map(async (project) => {
          try {
            const res = await axios.get(`https://api.github.com/repos/${project.repo}`);
            data[project.repo] = res.data;
          } catch (error) {
            console.error(`Error fetching data for ${project.repo}:`, error);
          }
        })
      );
      setRepoData(data);
    };

    fetchRepoData();
  }, []);

  return (
    <section className="project-section" id="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => {
          const repo = repoData[project.repo] || {};
          return (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="repo-stats">
                <span>
                  <FaStar /> {repo.stargazers_count || '0'}
                </span>
                <span>
                  <FaCodeBranch /> {repo.forks_count || '0'}
                </span>
                <span>
                  <FaExclamationCircle /> {repo.open_issues_count || '0'}
                </span>
                <span>
                  <FaCircle /> {repo.language || 'N/A'}
                </span>
                <span>
                  <FaClock />{' '}
                  {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              <div className="project-links">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
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
