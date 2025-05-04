import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Navbar from './Visiteurs/Navbar';
import Footer from './Visiteurs/Footer';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    password_confirmation: '',
    role: '',
    date_naissance: '',
    specialite_id: '',
    ville_id: '',
    photo: '',
  });
  const [villes, setVilles] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    if (formData.role === 'medecin') {
      axios.get('http://127.0.0.1:8000/api/villes')
        .then(res => setVilles(res.data))
        .catch(err => console.error(err));

      axios.get('http://127.0.0.1:8000/api/specialites')
        .then(res => setSpecialites(res.data))
        .catch(err => console.error(err));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', data);
      console.log('Success:', response.data);
      alert('Inscription réussie !');
    } catch (error) {
      if (error.response) {
        console.error('Erreur:', error.response.data);
        alert('Erreur: ' + JSON.stringify(error.response.data));
      } else {
        console.error('Erreur réseau:', error.message);
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <h2 style={styles.title}>Inscription</h2>

        <input type="text" name="nom" placeholder="Nom" required onChange={handleChange} style={styles.input} />
        <input type="text" name="prenom" placeholder="Prénom" required onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} style={styles.input} />
        <input type="text" name="telephone" placeholder="Téléphone" required onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Mot de passe" required onChange={handleChange} style={styles.input} />
        <input type="password" name="password_confirmation" placeholder="Confirmer mot de passe" required onChange={handleChange} style={styles.input} />

        <select name="role" style={styles.input} onChange={handleChange} value={formData.role}>
          <option value="">Sélectionner un rôle</option>
          <option value="patient">Patient</option>
          <option value="medecin">Médecin</option>
          <option value="admin">Admin</option>
        </select>

        {formData.role === 'patient' && (
          <input type="date" name="date_naissance" required style={styles.input} onChange={handleChange} />
        )}

        {formData.role === 'medecin' && (
          <>
            <select name="ville_id" required style={styles.input} onChange={handleChange}>
              <option value="">Choisissez une ville</option>
              {villes.map(ville => (
                <option key={ville.id} value={ville.id}>{ville.nom}</option>
              ))}
            </select>

            <select name="specialite_id" required style={styles.input} onChange={handleChange}>
              <option value="">Choisissez une spécialité</option>
              {specialites.map(spec => (
                <option key={spec.id} value={spec.id}>{spec.nom}</option>
              ))}
            </select>

            <input type="file" name="photo" accept="image/*" required style={styles.input} onChange={handleChange} />
          </>
        )}
        <button type="submit" style={styles.button}>S'inscrire</button>
      </form>
    </div>
    <Footer/>
    </>
  );
  
}

export default RegisterForm;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  },
  form: {
    width: 400,
    backgroundColor: '#e6f2fc',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#007bdb',
    marginBottom: 20
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 15
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007bdb',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer'
  }
};
