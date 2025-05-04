import React, { useEffect, useState } from 'react';
import { FaFilePrescription, FaCalendarAlt, FaUserMd, FaPills } from 'react-icons/fa';

const MesOrdonnances = () => {
  const [ordonnances, setOrdonnances] = useState([]);
  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('patient_id');

  useEffect(() => {
    const fetchOrdonnances = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/ordonnances/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erreur lors du chargement des ordonnances');
        const data = await response.json();
        setOrdonnances(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrdonnances();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}><FaFilePrescription style={styles.iconTitle} /> Mes Ordonnances</h2>
      <div style={styles.cardContainer}>
        {ordonnances.length === 0 ? (
          <p style={styles.message}>Aucune ordonnance disponible.</p>
        ) : (
          ordonnances.map((ordonnance) => (
            <div key={ordonnance.id} style={styles.card}>
              <p><FaCalendarAlt style={styles.icon} /> <strong>Date :</strong> {ordonnance.date}</p>
              <p><FaUserMd style={styles.icon} /> <strong>Médecin :</strong> Dr. {ordonnance.medecin}</p>
              <p><FaPills style={styles.icon} /> <strong>Médicaments :</strong> {ordonnance.medicaments}</p>
              {ordonnance.commentaire && (
                <p><strong>Commentaire :</strong> {ordonnance.commentaire}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f9ff',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 28,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  iconTitle: {
    marginRight: 10,
    color: '#007bdb',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    padding: '0 10px',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderLeft: '5px solid #007bdb',
  },
  icon: {
    marginRight: 8,
    color: '#007bdb',
  },
  message: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
  }
};

export default MesOrdonnances;
