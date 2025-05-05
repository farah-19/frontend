import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const MedecinHistorique = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const medecinId = localStorage.getItem('medecin_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/rendezvous/medecins/${medecinId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });

        const data = await res.json();
        setRendezVous(data);
        setFiltered(data);
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous :', err);
      }
    };

    fetchRendezVous();
  }, []);

  useEffect(() => {
    const result = rendezVous.filter(rdv => {
      const matchesName = `${rdv.patient.nom} ${rdv.patient.prenom}`.toLowerCase().includes(search.toLowerCase());
      const matchesDate = date ? rdv.date_heure.startsWith(date) : true;
      return matchesName && matchesDate;
    });
    setFiltered(result);
  }, [search, date, rendezVous]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}><FaCalendarAlt style={styles.iconTitle} /> Historique des Rendez-vous</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.cardContainer}>
        {filtered.length === 0 ? (
          <p style={styles.message}>Aucun rendez-vous trouvé.</p>
        ) : (
          filtered.map(rdv => (
            <div key={rdv.id} style={styles.card}>
              <p><FaUser style={styles.icon} /> <strong>Patient :</strong> {rdv.patient.nom} {rdv.patient.prenom}</p>
              <p><FaCalendarAlt style={styles.icon} /> <strong>Date :</strong> {new Date(rdv.date_heure).toLocaleString()}</p>
              <p><strong>Statut :</strong> <span style={styles.badge(rdv.statut)}>{rdv.statut}</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    padding: '30px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 25,
  },
  iconTitle: {
    marginRight: 10,
    color: '#0077cc',
  },
  filters: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: 25,
    flexWrap: 'wrap'
  },
  input: {
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: 16,
    width: '250px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    borderLeft: '5px solid #0077cc',
  },
  icon: {
    marginRight: 8,
    color: '#0077cc',
  },
  badge: (statut) => ({
    padding: '5px 10px',
    borderRadius: 6,
    color: '#fff',
    backgroundColor: statut === 'confirmé' ? '#28a745' : '#ffc107',
    fontWeight: 'bold',
    fontSize: 14
  }),
  message: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
  }
};

export default MedecinHistorique;
