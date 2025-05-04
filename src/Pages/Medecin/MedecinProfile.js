import React, { useEffect, useState } from 'react';
import { MdEmail, MdPhone, MdCake, MdEdit, MdSave } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

const MedecinProfile = () => {
  const [medecin, setMedecin] = useState(null);
  const [ville, setVille] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');
  const medecinId = localStorage.getItem('medecin_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/medecins/${medecinId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMedecin(data);
        setFormData(data);

        const villeRes = await fetch(`http://localhost:8000/api/villes`);
        const villes = await villeRes.json();
        const villeNom = villes.find(v => v.id === data.ville_id)?.nom || '';
        setVille(villeNom);

        const specRes = await fetch(`http://localhost:8000/api/specialites`);
        const specialites = await specRes.json();
        const specNom = specialites.find(s => s.id === data.specialite_id)?.nom || '';
        setSpecialite(specNom);
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/medecins/${medecinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setMedecin(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Erreur de mise à jour:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {medecin?.photo ? (
          <img src={medecin.photo} alt="Médecin" style={styles.photo} />
        ) : null}

        <h2 style={styles.name}>
          {medecin?.nom} {medecin?.prenom}
          {medecin?.verified === 1 && (
            <FaCheckCircle style={styles.verifiedIcon} title="Vérifié" />
          )}
        </h2>

        {editMode ? (
          <div style={styles.form}>
            <input type="text" name="nom" value={formData.nom || ''} onChange={handleChange} style={styles.input} />
            <input type="text" name="prenom" value={formData.prenom || ''} onChange={handleChange} style={styles.input} />
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} style={styles.input} />
            <input type="text" name="telephone" value={formData.telephone || ''} onChange={handleChange} style={styles.input} />
            <button style={{ ...styles.button, backgroundColor: '#28a745' }} onClick={handleUpdate}>
              <MdSave style={{ marginRight: 8 }} /> Enregistrer
            </button>
          </div>
        ) : (
          <div style={styles.info}>
            <p><strong>Nom :</strong> {medecin?.nom}</p>
            <p><strong>Prénom :</strong> {medecin?.prenom}</p>
            <p><MdEmail style={styles.fieldIcon} /> <strong>Email :</strong> {medecin?.email}</p>
            <p><MdPhone style={styles.fieldIcon} /> <strong>Téléphone :</strong> {medecin?.telephone}</p>
            <p><strong>Ville :</strong> {ville}</p>
            <p><strong>Spécialité :</strong> {specialite}</p>
            <button style={styles.button} onClick={() => setEditMode(true)}>
              <MdEdit style={{ marginRight: 8 }} /> Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#eaf2f8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: 15,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: 550
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 15,
    border: '2px solid #58A6FF'
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  verifiedIcon: {
    color: '#58A6FF',
    fontSize: 20
  },
  info: {
    textAlign: 'left',
    lineHeight: 2,
    fontSize: 17
  },
  fieldIcon: {
    color: '#007bdb',
    marginRight: 8,
    fontSize: 20
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '12px 15px',
    marginBottom: 18,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16
  },
  button: {
    backgroundColor: '#007bdb',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 25,
    fontSize: 16,
    display: 'inline-flex',
    alignItems: 'center'
  },
  form: {
    marginTop: 20,
    textAlign: 'left'
  }
};

export default MedecinProfile;
