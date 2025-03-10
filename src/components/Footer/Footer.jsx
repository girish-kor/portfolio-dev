import React from 'react';
import './Footer.scss';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>© {new Date().getFullYear()} Girish Kor. All rights reserved.</p>
      <div className="social-icons">
        <a
          href="https://github.com/girish-kor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/girish-kor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/girishkor/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
