import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionVillesEtSpecialites = () => {
  const [villes, setVilles] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [nom, setNom] = useState('');
  const [type, setType] = useState('ville');
  const [editing, setEditing] = useState(null); // { id, type }
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/villes').then(res => setVilles(res.data));
    axios.get('http://localhost:8000/api/specialites').then(res => setSpecialites(res.data));
  }, [refresh]);

  const handleAddOrEdit = () => {
    const url = `http://localhost:8000/api/${type === 'ville' ? 'villes' : 'specialites'}` +
      (editing ? `/${editing.id}` : '');
    const method = editing ? 'put' : 'post';

    axios[method](url, { nom })
      .then(() => {
        setNom('');
        setEditing(null);
        setRefresh(!refresh);
      })
      .catch(err => alert(err.response.data.message || 'Erreur'));
  };

  const handleEditClick = (item, type) => {
    setNom(item.nom);
    setEditing({ id: item.id, type });
    setType(type);
  };

  const handleDelete = (id, type) => {
    const url = `http://localhost:8000/api/${type === 'ville' ? 'villes' : 'specialites'}/${id}`;
    axios.delete(url).then(() => setRefresh(!refresh));
  };

  const handleCancelEdit = () => {
    setNom('');
    setEditing(null);
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ebf8ff',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    selectBox: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    inputBox: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    actionButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    listContainer: {
      display: 'flex',
      gap: '30px',
    },
    listSection: {
      flex: 1,
    },
    sectionHeading: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #ddd',
      marginBottom: '10px',
      borderRadius: '5px',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
    },
    editButton: {
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteButton: {
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Gestion des Villes & Spécialités</h2>

      <div style={styles.formContainer}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={editing !== null}
          style={styles.selectBox}
        >
          <option value="ville">Ville</option>
          <option value="specialite">Spécialité</option>
        </select>

        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder={`Nom de la ${type}`}
          style={styles.inputBox}
        />

        <button
          onClick={handleAddOrEdit}
          style={styles.actionButton}
        >
          {editing ? 'Modifier' : 'Ajouter'}
        </button>

        {editing && (
          <button
            onClick={handleCancelEdit}
            style={styles.cancelButton}
          >
            Annuler
          </button>
        )}
      </div>

      <div style={styles.listContainer}>
        {/* Villes Section */}
        <div style={styles.listSection}>
          <h3 style={styles.sectionHeading}>Villes</h3>
          <ul style={styles.list}>
            {villes.map(ville => (
              <li key={ville.id} style={styles.listItem}>
                <span>{ville.nom}</span>
                <div style={styles.buttons}>
                  <button
                    onClick={() => handleEditClick(ville, 'ville')}
                    style={styles.editButton}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(ville.id, 'ville')}
                    style={styles.deleteButton}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Specialités Section */}
        <div style={styles.listSection}>
          <h3 style={styles.sectionHeading}>Spécialités</h3>
          <ul style={styles.list}>
            {specialites.map(s => (
              <li key={s.id} style={styles.listItem}>
                <span>{s.nom}</span>
                <div style={styles.buttons}>
                  <button
                    onClick={() => handleEditClick(s, 'specialite')}
                    style={styles.editButton}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, 'specialite')}
                    style={styles.deleteButton}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GestionVillesEtSpecialites;
