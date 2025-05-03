import React from 'react';
import { FaHeartbeat, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const styles = {
  footer: {
    backgroundColor: '#1f2937', // fond sombre pour un joli contraste
    color: '#fff',
    padding: '2rem 1rem',
    fontFamily: "'Roboto', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  column: {
    flex: '1 1 250px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#58A6FF', // accent color pour le logo
  },
  icon: {
    marginRight: '0.5rem',
    color: '#58A6FF', // même couleur d'accent pour les icônes
  },
  link: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.85rem',
    borderTop: '1px solid #374151',
    paddingTop: '1rem',
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <div style={styles.logo}>
            <FaHeartbeat style={styles.icon} />
            MedConnect
          </div>
          <p>Votre partenaire de confiance pour la santé et le bien-être.</p>
        </div>

        <div style={styles.column}>
          <h4>Liens rapides</h4>
          <a href="#" style={styles.link}>Accueil</a>
          <a href="#" style={styles.link}>À propos</a>
          <a href="#" style={styles.link}>Services</a>
          <a href="#" style={styles.link}>Contact</a>
        </div>

        <div style={styles.column}>
          <h4>Contact</h4>
          <div style={styles.contactItem}>
            <FaPhoneAlt style={styles.icon} /> +212 6 00 00 00 00
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.icon} /> contact@medconnect.com
          </div>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt style={styles.icon} /> Casablanca, Maroc
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        &copy; {new Date().getFullYear()} MedConnect. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
