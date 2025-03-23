import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentNav from './components/ContentNav';
import Header from './components/Header';
import './main.scss';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
      if (!GITHUB_TOKEN) {
        console.error('❌ GitHub token is missing!');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      };

      try {
        const userResponse = await axios.get('https://api.github.com/users/girish-kor', config);
        if (!userResponse.data.repos_url) throw new Error('❌ Repos URL missing');

        const repositories = await axios.get(userResponse.data.repos_url, config);
        const enrichedRepos = await Promise.all(
          repositories.data.map(async repo => {
            try {
              const languages = await axios.get(repo.languages_url, config);
              return { ...repo, languages: languages.data };
            } catch (err) {
              console.error('⚠️ Error fetching languages for', repo.name);
              return { ...repo, languages: {} };
            }
          })
        );

        setUserData(userResponse.data);
        setRepos(enrichedRepos);
      } catch (err) {
        console.error('❌ GitHub API Error:', err);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="app">
      <Header user={userData} />
      <ContentNav active={activeSection} setActive={setActiveSection} />
      <main>
        {activeSection === 'about' && <About user={userData} repos={repos} />}
        {activeSection === 'projects' && <Projects repos={repos} />}
        {activeSection === 'contact' && <Contact user={userData} />}
      </main>
    </div>
  );
}
