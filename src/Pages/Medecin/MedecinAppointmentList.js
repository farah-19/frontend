import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedecinRendezVous = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
    const medecinId = localStorage.getItem("medecin_id");

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/rendezvous/medecins/${medecinId}`);
        setRendezVous(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    };

    fetchRendezVous();
  }, [medecinId]);

  const updateStatut = async (id, nouveauStatut) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/rendezvous/${id}`, {
        statut: nouveauStatut,
      });
      setRendezVous((prev) =>
        prev.map((rdv) => (rdv.id === id ? { ...rdv, statut: nouveauStatut } : rdv))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  const styles = {
    card: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    status: (statut) => ({
      color: statut === 'confirmé' ? 'green' : 'orange',
      fontWeight: 'bold',
    }),
    button: {
      marginRight: '10px',
      padding: '8px 12px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
    },
    confirm: {
      backgroundColor: 'green',
    },
    attente: {
      backgroundColor: 'orange',
    },
    details: {
      backgroundColor: '#007bff',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      width: '400px',
    }
  };

  return (
    <div>
      <h2>Mes Rendez-vous</h2>
      {rendezVous.map((rdv) => (
        <div key={rdv.id} style={styles.card}>
          <p><strong>Patient :</strong> {rdv.patient?.nom} {rdv.patient?.prenom}</p>
          <p><strong>Date :</strong> {rdv.date_heure.split(' ')[0]}</p>
          <p><strong>Heure :</strong> {rdv.date_heure.split(' ')[1]}</p>
          <p><strong>Statut :</strong> <span style={styles.status(rdv.statut)}>{rdv.statut}</span></p>

          {rdv.statut === "en attente" ? (
            <button
              style={{ ...styles.button, ...styles.confirm }}
              onClick={() => updateStatut(rdv.id, "confirmé")}
            >
              Confirmer
            </button>
          ) : (
            <button
              style={{ ...styles.button, ...styles.attente }}
              onClick={() => updateStatut(rdv.id, "en attente")}
            >
              Remettre en attente
            </button>
          )}

          <button
            style={{ ...styles.button, ...styles.details }}
            onClick={() => {
              setSelectedPatient(rdv.patient);
              setShowModal(true);
            }}
          >
            Voir les détails
          </button>
        </div>
      ))}

      {showModal && selectedPatient && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3>Détails du patient</h3>
            <p><strong>Nom :</strong> {selectedPatient.nom}</p>
            <p><strong>Prénom :</strong> {selectedPatient.prenom}</p>
            <p><strong>Email :</strong> {selectedPatient.email}</p>
            <p><strong>Téléphone :</strong> {selectedPatient.telephone}</p>
            <p><strong>Date de naissance :</strong> {selectedPatient.date_naissance}</p>
            <button onClick={() => setShowModal(false)} style={{ ...styles.button, backgroundColor: 'gray' }}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedecinRendezVous;
