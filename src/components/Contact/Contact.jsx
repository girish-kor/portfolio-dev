import React from 'react';
import './Contact.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <h2>
        <FaEnvelope /> Contact Me
      </h2>
      <p>Let's connect! Open to collaborations, opportunities, or a friendly chat.</p>

      <div className="contact-details">
        <a
          href="mailto:girishkor05@gmail.com"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HiOutlineMail className="icon" /> girishkor05@gmail.com
        </a>
        <a
          href="https://github.com/girish-kor"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icon" /> github.com/girish-kor
        </a>
        <a
          href="https://linkedin.com/in/girish-kor"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" /> linkedin.com/in/girish-kor
        </a>
        <a
          href="https://www.instagram.com/girishkor/"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="icon" /> instagram.com/girishkor
        </a>
      </div>
    </section>
  );
};

export default Contact;
