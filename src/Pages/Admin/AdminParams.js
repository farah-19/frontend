import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SettingManager() {
  const [settings, setSettings] = useState({
    app_name: '',
    email: '',
    timezone: '',
  });

  const [adminForm, setAdminForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    password_confirmation: '',
    role: 'admin',
  });

  const [message, setMessage] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [error, setError] = useState('');
  const [adminError, setAdminError] = useState('');

  const boxStyle = {
    maxWidth: '600px',
    margin: '30px auto',
    backgroundColor: 'whiteyellow',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '10px',
    margin: '8px 0',
    width: '96%',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  };

  const btnStyle = {
    padding: '12px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  const containerStyle = {
    backgroundColor: '#ebf8ff',
    borderRadius: '16px',
    padding: '20px',
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/settings');
        const result = res.data.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setSettings(result);
      } catch (err) {
        console.error('Erreur lors de la récupération des paramètres.');
      }
    };
    fetchSettings();
  }, []);

  const handleSettingChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      for (const key in settings) {
        await axios.post('http://localhost:8000/api/settings', {
          key,
          value: settings[key],
          type: 'string',
          is_active: true,
        });
      }
      setMessage('Paramètres enregistrés avec succès.');
    } catch (err) {
      setError('Erreur lors de l’enregistrement des paramètres.');
    }
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    setAdminMessage('');
    setAdminError('');
    try {
      const res = await axios.post('http://localhost:8000/api/register', adminForm);
      setAdminMessage(res.data.message || 'Administrateur ajouté avec succès.');
      setAdminForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        password_confirmation: '',
        role: 'admin',
      });
    } catch (err) {
      setAdminError(err.response?.data?.error || 'Erreur lors de l’ajout de l’admin.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Page - Settings & Users</h2>

      <div style={boxStyle}>
        <h3>Paramètres de l'application</h3>
        <form onSubmit={saveSettings}>
          <input style={inputStyle} type="text" name="app_name" placeholder="Nom de l'application" value={settings.app_name || ''} onChange={handleSettingChange} required />
          <input style={inputStyle} type="email" name="email" placeholder="Email de contact" value={settings.email || ''} onChange={handleSettingChange} required />
          <input style={inputStyle} type="text" name="timezone" placeholder="Fuseau horaire" value={settings.timezone || ''} onChange={handleSettingChange} required />
          <button style={btnStyle} type="submit">Enregistrer les Paramètres</button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      <div style={boxStyle}>
        <h3>Ajouter un Administrateur</h3>
        <form onSubmit={addAdmin}>
          <input style={inputStyle} type="text" name="nom" placeholder="Nom" value={adminForm.nom} onChange={handleAdminChange} required />
          <input style={inputStyle} type="text" name="prenom" placeholder="Prénom" value={adminForm.prenom} onChange={handleAdminChange} required />
          <input style={inputStyle} type="email" name="email" placeholder="Email" value={adminForm.email} onChange={handleAdminChange} required />
          <input style={inputStyle} type="text" name="telephone" placeholder="Téléphone" value={adminForm.telephone} onChange={handleAdminChange} required />
          <input style={inputStyle} type="password" name="password" placeholder="Mot de passe" value={adminForm.password} onChange={handleAdminChange} required />
          <input style={inputStyle} type="password" name="password_confirmation" placeholder="Confirmer le mot de passe" value={adminForm.password_confirmation} onChange={handleAdminChange} required />
          <button style={btnStyle} type="submit">Ajouter l'Administrateur</button>
        </form>
        {adminMessage && <p style={{ color: 'green', marginTop: '10px' }}>{adminMessage}</p>}
        {adminError && <p style={{ color: 'red', marginTop: '10px' }}>{adminError}</p>}
      </div>
    </div>
  );
}
