import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Visiteurs/Navbar';
import Footer from './Visiteurs/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
        role,
      });

      // Sauvegarde du token dans le localStorage
      localStorage.setItem('token', response.data.token);

      // Sauvegarde des IDs (selon le rôle) dans le localStorage
      if (response.data.medecin_id) {
        localStorage.setItem('medecin_id', response.data.medecin_id);
      }
      if (response.data.patient_id) {
        localStorage.setItem('patient_id', response.data.patient_id);
      }
      if (response.data.admin_id) {
        localStorage.setItem('admin_id', response.data.admin_id);
      }

      setMessage('Connexion réussie');
      console.log('Token:', response.data.token);

      // Redirection en fonction du rôle
      if (role === 'admin') {
        window.location.href = '/admin';  // Remplacer par ton chemin d'administration
      } else if (role === 'medecin') {
        window.location.href = '/medecin';  // Remplacer par ton chemin pour les médecins
      } else if (role === 'patient') {
        window.location.href = '/patient';  // Remplacer par ton chemin pour les patients
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
      }}>
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: '#e6f2fc',
            padding: 30,
            borderRadius: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: 350,
            textAlign: 'center'
          }}
        >
          <h2 style={{ color: '#007bdb', marginBottom: 20 }}>Connexion</h2>

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="patient">Patient</option>
            <option value="medecin">Médecin</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#007bdb',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Se connecter
          </button>

          {message && (
            <p style={{ marginTop: 15, color: 'red' }}>{message}</p>
          )}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 14 }}>
              Pas de compte ? <a href="/register" style={{ color: '#007bdb', textDecoration: 'none' }}>Inscrivez-vous</a>
            </p>
            <p style={{ fontSize: 14 }}>
              <a href="/forgetPswd" style={{ color: '#007bdb', textDecoration: 'none' }}>Mot de passe oublié ?</a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: 12,
  marginBottom: 15,
  border: '1px solid #ccc',
  borderRadius: 8,
  fontSize: 15,
};

export default Login;
