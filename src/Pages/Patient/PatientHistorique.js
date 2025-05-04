import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    backgroundColor: '#eaf6ff',
    padding: '2rem',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '300px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '1rem',
  },
  info: {
    marginBottom: '0.5rem',
  },
  cancelButton: {
    marginTop: '1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '0.6rem',
    border: 'none',
    width: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

const MesRendezVous = () => {
  const [rendezvous, setRendezvous] = useState([]);
  const patientId = localStorage.getItem('patient_id');

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/rendezvous/patient/${patientId}`)
      .then((res) => setRendezvous(res.data))
      .catch((err) => console.log(err));
  }, [patientId]);

  const handleAnnuler = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) return;
    axios
      .delete(`http://127.0.0.1:8000/api/rendezvous/${id}`)
      .then(() => {
        setRendezvous((prev) => prev.filter((rdv) => rdv.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mes Rendez-vous</h2>
      <div style={styles.cardContainer}>
        {rendezvous.map((rdv) => (
          <div key={rdv.id} style={styles.card}>
            <div style={styles.name}>Dr. {rdv.medecin_nom}</div>
            <div style={styles.info}><strong>Date :</strong> {rdv.date_heure}</div>
            <div style={styles.info}><strong>Statut :</strong> {rdv.statut}</div>
            <div style={styles.info}><strong>Email :</strong> {rdv.medecin_email}</div>
            <div style={styles.info}><strong>Téléphone :</strong> {rdv.medecin_tel}</div>
            <div style={styles.info}><strong>Spécialité :</strong> {rdv.specialite}</div>
            {rdv.statut === 'en attente' && (
              <button style={styles.cancelButton} onClick={() => handleAnnuler(rdv.id)}>
                Annuler
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesRendezVous;
