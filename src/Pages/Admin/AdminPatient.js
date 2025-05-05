import React, { useState, useEffect } from 'react';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetching patients data
    fetch('http://localhost:8000/api/patients')
      .then(res => res.json())
      .then(data => {
        setPatients(data);
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
      <h1 style={styles.title}>Liste des Patients</h1>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Nom</th>
            <th style={styles.tableCell}>Prénom</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td style={styles.tableCell}>{patient.id}</td>
              <td style={styles.tableCell}>{patient.nom}</td>
              <td style={styles.tableCell}>{patient.prenom}</td>
              <td style={styles.tableCell}>{patient.email}</td>
              <td style={styles.tableCell}>{patient.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
