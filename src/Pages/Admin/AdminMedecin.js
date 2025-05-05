import React, { useState, useEffect } from 'react';

const MedecinsList = () => {
  const [medecins, setMedecins] = useState([]);

  useEffect(() => {
    // Fetching medecins data
    fetch('http://localhost:8000/api/medecins')
      .then(res => res.json())
      .then(data => {
        setMedecins(data);
      });
  }, []);

  // Inline Styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
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
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des Médecins</h1>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Nom</th>
            <th style={styles.tableCell}>Prénom</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Téléphone</th>
            <th style={styles.tableCell}>Spécialité</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map(medecin => (
            <tr key={medecin.id}>
              <td style={styles.tableCell}>{medecin.id}</td>
              <td style={styles.tableCell}>{medecin.nom}</td>
              <td style={styles.tableCell}>{medecin.prenom}</td>
              <td style={styles.tableCell}>{medecin.email}</td>
              <td style={styles.tableCell}>{medecin.telephone}</td>
              <td style={styles.tableCell}>{medecin.specialite_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedecinsList;
