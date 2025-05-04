import React, { useEffect, useState } from 'react';

const conseils = [
  "Buvez au moins 1,5 litre d'eau par jour.",
  "Mangez 5 fruits et légumes par jour.",
  "Faites 30 minutes d'activité physique par jour.",
  "Dormez entre 7 et 9 heures chaque nuit.",
  "Réduisez votre consommation de sucre.",
  "Évitez le stress en pratiquant la méditation.",
  "Lavez-vous les mains régulièrement.",
  "Ne sautez pas le petit déjeuner.",
  "Évitez de fumer et de boire de l'alcool.",
  "Consultez un médecin régulièrement, même sans symptôme."
];

const PatientHome = () => {
  const [conseil, setConseil] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('patient_id');
  console.log("Patient ID:", patientId); // Vérification de l'ID du patient

  useEffect(() => {
    const fetchAppointments = async () => {
        if (!token || !patientId) {
            console.error('Token ou ID de patient manquant');
            setLoading(false);
            return;
        }
        
      try {
        const response = await fetch(`http://localhost:8000/api/rendezvous/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des rendez-vous');
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Générer un conseil aléatoire
  const genererConseil = () => {
    const index = Math.floor(Math.random() * conseils.length);
    setConseil(conseils[index]);
  };

  useEffect(() => {
    genererConseil(); // au chargement de la page
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titre}>Bienvenue sur votre espace patient</h1>

      {/* ---- Carte de conseils ---- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Conseil du jour</h2>
        <p style={styles.conseil}>{conseil}</p>
        <button style={styles.bouton} onClick={genererConseil}>
          Voir un autre conseil
        </button>
      </div>

      {/* ---- Section des rendez-vous ---- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Vos rendez-vous à venir</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : appointments.length === 0 ? (
          <p>Aucun rendez-vous à venir.</p>
        ) : (
          appointments.map((rdv, index) => (
            <div key={index} style={styles.rdvItem}>
              <p><strong>Médecin :</strong> {rdv.medecin_name || 'Non spécifié'}</p>
              <p><strong>Date :</strong> {rdv.date}</p>
              <p><strong>Heure :</strong> {rdv.heure}</p>
              <p><strong>Statut :</strong> {rdv.statut}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 40,
    fontFamily: 'Arial',
    backgroundColor: '#f7fafd',
    minHeight: '100vh'
  },
  titre: {
    textAlign: 'center',
    color: '#2c3e50'
  },
  card: {
    backgroundColor: '#eaf4fc',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    maxWidth: 600,
    margin: '40px auto',
    textAlign: 'center'
  },
  cardTitle: {
    color: '#007bdb',
    marginBottom: 15
  },
  conseil: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20
  },
  bouton: {
    padding: '10px 20px',
    backgroundColor: '#007bdb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer'
  },
  rdvItem: {
    textAlign: 'left',
    marginBottom: 10
  }
};

export default PatientHome;
