import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

export default function Projects({ repos }) {
  const [repoLanguageData, setRepoLanguageData] = useState({});

  useEffect(() => {
    const generateLanguageData = () => {
      const languageData = {};
      repos
        .filter((repo) => repo.name.toLowerCase() !== 'girish-kor')
        .forEach((repo) => {
          if (Object.keys(repo.languages).length > 0) {
            languageData[repo.id] = {
              labels: Object.keys(repo.languages),
              datasets: [
                {
                  data: Object.values(repo.languages),
                  backgroundColor: [
                    '#ff6b6b', '#ffa502', '#1dd1a1', '#2ed573',
                    '#ff4757', '#3742fa', '#5352ed', '#ff9f1a',
                  ],
                },
              ],
            };
          }
        });
      setRepoLanguageData(languageData);
    };

    generateLanguageData();
  }, [repos]);

  return (
    <section className="projects-section">
      <div className="projects-scroller">
        {repos
          .filter((repo) => repo.name.toLowerCase() !== 'girish-kor')
          .map((repo) => (
            <div key={repo.id} className="project-card">
              <h3 className="repo-name">{repo.name}</h3>
              <p className="repo-description">{repo.description || 'No description available.'}</p>

              <div className="buttons">
                <a
                  href={repo.html_url}
                  className="button button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repo
                </a>
                {repo.homepage ? (
                  <a
                    href={repo.homepage}
                    className="button button-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                ) : (
                  <span className="button button-disabled">No Live</span>
                )}
              </div>

              <div className="pie-chart-container">
                {repoLanguageData[repo.id] ? (
                  <Pie data={repoLanguageData[repo.id]} />
                ) : (
                  <p className="no-data">No language data available</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
