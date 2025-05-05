import React, { useEffect, useState } from 'react';

const OrdonnanceAdmin = () => {
  const [ordonnances, setOrdonnances] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/ordonnances')
      .then(res => res.json())
      .then(data => {
        setOrdonnances(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(ordonnances.filter(ord =>
      ord.patient.nom.toLowerCase().includes(value) ||
      ord.medecin.nom.toLowerCase().includes(value)
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette ordonnance ?")) {
      fetch(`http://localhost:8000/api/ordonnances/${id}`, {
        method: 'DELETE'
      }).then(() => {
        setFiltered(filtered.filter(o => o.id !== id));
        setOrdonnances(ordonnances.filter(o => o.id !== id));
      });
    }
  };

  // Styles inline
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginTop: '20px',
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    tableHeader: {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    button: {
      padding: '8px 12px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      color: '#fff',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h1>📄 Liste des Ordonnances</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Rechercher un patient ou médecin..."
        style={styles.searchInput}
      />

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Nom du Patient</th>
            <th style={styles.tableCell}>Nom du Médecin</th>
            <th style={styles.tableCell}>Date de prescription</th>
            <th style={styles.tableCell}>Contenu</th>
            <th style={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(ord => (
            <tr key={ord.id}>
              <td style={styles.tableCell}>{ord.id}</td>
              <td style={styles.tableCell}>{ord.patient.nom}</td>
              <td style={styles.tableCell}>{ord.medecin.nom}</td>
              <td style={styles.tableCell}>{ord.date_prescription}</td>
              <td style={styles.tableCell}>{ord.contenu}</td>
              <td style={styles.tableCell}>
                <button style={{ ...styles.button, ...styles.editButton }}>Modifier</button>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(ord.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdonnanceAdmin;
