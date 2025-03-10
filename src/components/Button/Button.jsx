import React from 'react';
import './Button.scss';

// Props: title (string), icon (React component), onClick (function)
const Button = ({ title, icon, onClick }) => (
  <button className="custom-button" onClick={onClick}>
    {icon && <span className="icon">{icon}</span>}
    <span>{title}</span>
  </button>
);

export default Button;
