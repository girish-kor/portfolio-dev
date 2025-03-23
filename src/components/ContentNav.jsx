export default function ContentNav({ active, setActive }) {
  const sections = ['about', 'projects', 'contact'];
  const resumeLink =
    'https://docs.google.com/document/d/1lAiLas3qJiEQrNqsf68O-2p6IVxqQPsR5vjkCa4fGB0/export?format=pdf';

  return (
    <nav className="content-nav">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActive(section)}
          className={active === section ? 'active' : ''}
        >
          {section.toUpperCase()}
        </button>
      ))}
      <a href={resumeLink} download className="resume-button">
      ↓ RESUME
      </a>
    </nav>
  );
}
