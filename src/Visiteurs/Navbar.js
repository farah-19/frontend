import React from 'react';
import Logo from '../Images/logo.png';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <img src={Logo} alt="MedConnect" style={styles.logo} />
      </div>

      <div style={styles.center}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#about" style={styles.link}>About</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </div>

      <div style={styles.right}>
        <a href="/login">
          <button style={styles.button}>Login</button>
        </a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#fff',
    padding: '15px 40px',  // Reduced padding to keep navbar height medium
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logo: {
    width: '80px',  // Increased width
    height: '80px'  // Increased height to make the logo bigger
  },
  title: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#333'
  },
  center: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flex: 1
  },
  link: {
    textDecoration: 'none',
    color: '#888',  // Gray color
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  },
  linkHover: {
    color: '#58A6FF'  // Soft sky blue hover color
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#58A6FF',  // Soft sky blue color
    color: '#fff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'background-color 0.3s ease'
  },
  buttonHover: {
    backgroundColor: '#4a90e2'  // Slightly darker sky blue on hover
  }
};
