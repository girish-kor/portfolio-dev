import { useEffect, useState } from 'react';

export default function Header({ user }) {
  const [typedBio, setTypedBio] = useState('');

  useEffect(() => {
    let index = 0;
    const animateTyping = () => {
      setTypedBio(user?.bio?.slice(0, index) || '');
      if (index < (user?.bio?.length || 0)) {
        index++;
        setTimeout(animateTyping, 50);
      }
    };
    animateTyping();
  }, [user?.bio]);

  return (
    <header className="header">
      <div className="profile-container">
        <img src={user?.avatar_url} alt="Profile" className="profile-img" />
        <div className="profile-text">
          <h1 className="animate-fadein">{user?.name}</h1>
          <h2 className="animate-slidein">@{user?.login}</h2>
          <p className="bio">{typedBio}</p>
        </div>
      </div>
    </header>
  );
}
