import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-Commerce Website</p>
    </footer>
  );
};

export default Footer;
