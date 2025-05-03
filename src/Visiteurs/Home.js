// src/pages/Home.js
import React from 'react';
import doctorsImage from '../Images/Hospitale.png'; // ton image

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.title}>Bienvenue sur MedConnect</h1>
        <p style={styles.description}>
          Une plateforme qui permet aux patients de prendre des rendez-vous médicaux en ligne et aux médecins de gérer leur emploi du temps.
        </p>
        <button style={styles.button}>Get Started</button>
      </div>
      <img src={doctorsImage} alt="doctors" style={styles.image} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '100px 40px 40px', // padding top augmenté pour l'espace
    backgroundColor: '#ebf8ff',
    flexWrap: 'wrap',
  },
  textContainer: {
    textAlign: 'left',
    marginRight: '20px',
    flex: 1,
    minWidth: '300px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: '10px',
  },
  description: {
    color: '#4a5568',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#4299e1',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
    border: 'none',
  },
  image: {
    width: '50%',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)', // shadow noir modéré
    minWidth: '280px',
  }
};
