export default function Contact({ user }) {
  const copyToClipboard = (text) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const extractInstagram = () => {
    const match = user?.blog?.match(/instagram\.com\/([\w]+)/);
    return match ? `https://instagram.com/${match[1]}` : null;
  };

  return (
    <div className="contact-section">
      <div className="glass-card">
        <div className="contact-item">{user?.location || 'Earth'}</div>

        <div 
          className="contact-item clickable" 
          onClick={() => copyToClipboard(user?.email)}
        >
          {user?.email || 'No public email'}
        </div>

        <a href={user?.html_url} className="contact-item button">
          🐱 GitHub Profile
        </a>

        {extractInstagram() && (
          <a href={extractInstagram()} className="contact-item button">
            Instagram
          </a>
        )}
      </div>
    </div>
  );
}
