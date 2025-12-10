import React from 'react';
import './About.css';

const About = () => {
  return (
    <footer className="footer" id='About'>
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            Second Brain is a personal knowledge management platform where users can save, organize, and retrieve important links, notes, and resources from various platforms in one place.
          </p>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>✉️ Email: <a href="mailto:abdulahad6336123@gmail.com">abdulahad6336123@gmail.com</a></p>
          <p>💼 LinkedIn: <a href="https://linkedin.com/in/abdul-ahad-780750289" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/abdul-ahad</a></p>
          <p>🛠️ GitHub: <a href="https://github.com/Abdul12Ahad" target="_blank" rel="noopener noreferrer">github.com/Abdul12Ahad</a></p>
        </div>

        <div className="footer-section social">
          <h3>Social</h3>
          <p>🐦 X: <a href="https://x.com/EmAbdulAhad?t=cbiJYHKmCTnwG3V5Oesg8Q&s=08" target="_blank" rel="noopener noreferrer">twitter.com/EmAbdulAhad</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Second Brain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default About;
