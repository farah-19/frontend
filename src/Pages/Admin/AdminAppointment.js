import React, { useState, useEffect } from 'react';

const RendezvousAdmin = () => {
  const [rendezvous, setRendezvous] = useState([]);
  const [filteredRendezvous, setFilteredRendezvous] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Fetching rendezvous data
    fetch('http://localhost:8000/api/rendezvous')
      .then(res => res.json())
      .then(data => {
        setRendezvous(data);
        setFilteredRendezvous(data);
      });
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterDate(value);
    if (value) {
      const filtered = rendezvous.filter(rdv => rdv.date_heure.includes(value));
      setFilteredRendezvous(filtered);
    } else {
      setFilteredRendezvous(rendezvous);
    }
  };

  // Inline Styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      marginTop: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
    },
    filterInput: {
      padding: '10px',
      marginBottom: '20px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#009688',
      color: '#fff',
      fontWeight: 'bold',
    },
    tableCell: {
      padding: '12px 20px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    button: {
      padding: '8px 15px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#ff9800',
      color: '#fff',
      fontWeight: 'bold',
    },
    card: {
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
      fontSize: '20px',
      color: '#333',
      marginBottom: '8px',
    },
    cardText: {
      color: '#555',
      margin: '5px 0',
    },
    status: (statut) => ({
      padding: '5px 10px',
      borderRadius: '4px',
      backgroundColor: statut === 'confirmé' ? '#4CAF50' : '#FF5722',
      color: '#fff',
      textAlign: 'center',
    }),
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📅 Gestion des Rendez-vous</h1>

      <input
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
        style={styles.filterInput}
      />

      <div style={styles.card}>
        {filteredRendezvous.length === 0 ? (
          <p>Aucun rendez-vous trouvé pour cette date.</p>
        ) : (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>ID</th>
                <th style={styles.tableCell}>Nom du Patient</th>
                <th style={styles.tableCell}>Nom du Médecin</th>
                <th style={styles.tableCell}>Date et Heure</th>
                <th style={styles.tableCell}>Statut</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRendezvous.map(rdv => (
                <tr key={rdv.id}>
                  <td style={styles.tableCell}>{rdv.id}</td>
                  <td style={styles.tableCell}>{rdv.patient.nom} {rdv.patient.prenom}</td>
                  <td style={styles.tableCell}>{rdv.medecin.nom} {rdv.medecin.prenom}</td>
                  <td style={styles.tableCell}>{rdv.date_heure}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.status(rdv.statut)}>{rdv.statut}</div>
                  </td>
                  <td style={styles.tableCell}>
                    <button style={styles.button}>Modifier</button>
                    <button style={styles.button}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RendezvousAdmin;
