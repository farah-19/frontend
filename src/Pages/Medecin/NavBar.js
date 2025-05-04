import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Images/logo.png';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Supprimer les données de session
        localStorage.removeItem('token');
        localStorage.removeItem('patient_id');
        // Rediriger vers la page d'accueil
        navigate('/');
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <img src={Logo} alt="MedConnect" style={styles.logo} />
      </div>

      <div style={styles.center}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/profile" style={styles.link}>Profile</a>
        <a href="/document" style={styles.link}>Document</a>
        <a href="/rendezvous" style={styles.link}>Rendez-vous</a>
        <a href="/dispo" style={styles.link}>Disponibilites</a>
        <a href="/historique" style={styles.link}>Historique</a>
      </div>

      <div style={styles.right}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#fff',
    padding: '15px 40px',
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
    width: '80px',
    height: '80px'
  },
  center: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flex: 1
  },
  link: {
    textDecoration: 'none',
    color: '#888',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Rouge Bootstrap
    color: '#fff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'background-color 0.3s ease'
  }
};
