// src/pages/Contact.js
import React from 'react';

export default function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Contactez-nous</h2>
        <p style={styles.subtitle}>Nous serons ravis de répondre à vos questions ou demandes.</p>

        <form style={styles.form}>
          <input type="text" placeholder="Nom complet" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <textarea placeholder="Message" style={styles.textarea}></textarea>
          <button type="submit" style={styles.button}>Envoyer</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f6ff',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#2d8eff'
  },
  subtitle: {
    color: '#555',
    fontSize: '15px',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#2d8eff',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  }
};
