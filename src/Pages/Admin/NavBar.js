import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Images/logo.png';
import { Home, User, FileText, Calendar, Clock, History, Settings, LogOut, HospitalIcon , Hospital } from 'lucide-react';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        localStorage.removeItem('token');
        localStorage.removeItem('patient_id');
        navigate('/');
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <>
      {/* Header */}
      <nav style={styles.nav}>
        <div style={styles.left}>
          <img src={Logo} alt="MedConnect" style={styles.logo} />
        </div>

        <div style={styles.center}>
          <a href="/" style={styles.link}>Home</a>
          <a href="/profile" style={styles.link}>Profile</a>
          <a href="/settings" style={styles.link}>Settings</a>
        </div>

        <div style={styles.right}>
          <div style={styles.hamburger} onClick={() => setSidebarOpen(true)}>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div style={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <img src={Logo} alt="MedConnect" style={{ width: '60px', marginBottom: 20 }} />
            </div>
            <a href="/" style={styles.sidebarLink}><Home size={18} /> Home</a>
            <a href="/profile" style={styles.sidebarLink}><User size={18} /> Profile</a>
            <a href="/document" style={styles.sidebarLink}><FileText size={18} /> Document</a>
            <a href="/rendezvous" style={styles.sidebarLink}><Calendar size={18} /> Rendez-vous</a>
            <a href="/dispo" style={styles.sidebarLink}><Hospital size={18} /> Medecins</a>
            <a href="/histori" style={styles.sidebarLink}><HospitalIcon size={18} /> Patients</a>
            <a href="/specville" style={styles.sidebarLink}><History size={18} /> Spec&Villes</a>
            <a href="/settings" style={styles.sidebarLink}><Settings size={18} /> Settings</a>

            <button onClick={handleLogout} style={styles.logoutButton}>
              <LogOut size={18} style={{ marginRight: 10 }} /> Logout
            </button>
          </div>
        </>
      )}
    </>
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
    borderBottomRightRadius: '20px',
    zIndex: 10,
    position: 'relative',
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
  hamburger: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px',
    color: '#888'
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#333',
    borderRadius: '2px'
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 20
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '260px',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
    zIndex: 30,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: '#777',
    fontSize: '15px',
    fontWeight: '500',
    padding: '8px 5px',
    borderRadius: '6px',
    transition: 'background 0.2s ease'
  },
  logoutButton: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px'
  }
};
