import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100px',
    borderRadius: '50%',
    marginRight: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#276ef1',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1.5rem',
    zIndex: 9999,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9998,
  },
  formGroup: {
    marginBottom: '1rem',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

function ListeMedecins() {
  const [medecins, setMedecins] = useState([]);
  const [selectedMedecin, setSelectedMedecin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('patient_id');

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/medecins")
      .then(res => setMedecins(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleEnvoyerAvis = () => {
    axios.post("http://127.0.0.1:8000/api/avis_medecins", {
      patient_id: patientId, // Remplacez par l'ID du patient connecté
      medecin_id: selectedMedecin.id,
      note,
      commentaire
    }).then(res => {
      setShowModal(false);
    }).catch(err => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des Médecins</h2>
      {medecins.map((medecin, index) => (
        <div key={index} style={styles.card}>
          <img src="/default-doctor.png" alt="medecin" style={styles.image} />
          <div style={{ flex: 1 }}>
            <h4>{medecin.nom}</h4>
            <p><strong>Spécialité:</strong> {medecin.specialite}</p>
            <p><strong>Ville:</strong> {medecin.ville}</p>
          </div>
          <button style={styles.button} onClick={() => {
            setSelectedMedecin(medecin);
            setShowModal(true);
            setNote(0);
            setCommentaire('');
          }}>
            Voir Détails
          </button>
        </div>
      ))}

      {showModal && (
        <>
          <div style={styles.overlay} onClick={() => setShowModal(false)} />
          <div style={styles.modal}>
            <h3>Détails du Médecin</h3>
            <p><strong>Nom :</strong> {selectedMedecin.nom}</p>
            <p><strong>Spécialité :</strong> {selectedMedecin.specialite}</p>
            <p><strong>Ville :</strong> {selectedMedecin.ville}</p>

            <h4>Donner un avis</h4>
            <div style={styles.formGroup}>
              <label>Note :</label>
              <select style={styles.select} value={note} onChange={e => setNote(e.target.value)}>
                <option value={0}>0</option>
                <option value={1}>1 ★</option>
                <option value={2}>2 ★</option>
                <option value={3}>3 ★</option>
                <option value={4}>4 ★</option>
                <option value={5}>5 ★</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Commentaire :</label>
              <textarea
                style={styles.textarea}
                value={commentaire}
                onChange={e => setCommentaire(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={styles.button} onClick={handleEnvoyerAvis}>Envoyer</button>
              <button style={styles.closeButton} onClick={() => setShowModal(false)}>Fermer</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListeMedecins;
