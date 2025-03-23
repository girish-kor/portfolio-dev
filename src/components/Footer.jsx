export default function Footer({ user }) {
  const username = user?.login || 'GitHub User';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {username} | {currentYear}</p>
    </footer>
  );
}
