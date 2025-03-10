import React from 'react';
import './Header.scss';
import Button from '../Button/Button';
import profileImage from '../../assets/profile.jpg';

// Icons
import { FaUserCircle, FaFolderOpen, FaDownload } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Header = ({ onSectionChange }) => {
  // Resume download handler
  const handleDownloadResume = () => {
    const resumeUrl =
      'https://docs.google.com/document/d/1lAiLas3qJiEQrNqsf68O-2p6IVxqQPsR5vjkCa4fGB0/export?format=pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Girish_Kor_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="header">
      {/* Profile Section */}
      <div className="profile-area">
        <img src={profileImage} alt="Girish Kor" className="profile-image" />
        <h1 className="name">Girish Kor</h1>
        <p className="tagline">Full Stack Java Developer | React.js Developer</p>
      </div>

      {/* Navigation Buttons */}
      <div className="button-area">
        <Button title="About" icon={<FaUserCircle />} onClick={() => onSectionChange('about')} />
        <Button
          title="Projects"
          icon={<FaFolderOpen />}
          onClick={() => onSectionChange('projects')}
        />
        <Button
          title="Contact"
          icon={<MdOutlineEmail />}
          onClick={() => onSectionChange('contact')}
        />
        <Button title="Resume" icon={<FaDownload />} onClick={handleDownloadResume} />
      </div>
    </header>
  );
};

export default Header;
