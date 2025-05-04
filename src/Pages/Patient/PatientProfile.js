import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdEmail, MdPhone, MdCake, MdEdit, MdSave } from 'react-icons/md';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('patient_id');

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });

        if (!response.ok) throw new Error('Erreur lors de la récupération des informations du patient');
        const data = await response.json();
        setPatient(data);
        setFormData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPatientInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      const updatedData = await response.json();
      setPatient(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <FaUserCircle style={styles.icon} />
        <h2 style={styles.name}>
          {patient?.nom || "Nom non disponible"} {patient?.prenom || ""}
        </h2>

        {editMode ? (
          <div style={styles.form}>
            <input
              type="text"
              name="nom"
              value={formData.nom || ''}
              onChange={handleChange}
              placeholder="Nom"
              style={styles.input}
            />
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ''}
              onChange={handleChange}
              placeholder="Prénom"
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
            />
            <input
              type="text"
              name="telephone"
              value={formData.telephone || ''}
              onChange={handleChange}
              placeholder="Téléphone"
              style={styles.input}
            />
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance || ''}
              onChange={handleChange}
              style={styles.input}
            />
            <button style={{ ...styles.button, backgroundColor: '#28a745' }} onClick={handleUpdate}>
              <MdSave style={{ marginRight: 8 }} /> Enregistrer
            </button>
          </div>
        ) : (
          <div style={styles.info}>
            <p><MdEmail style={styles.fieldIcon} /> <strong>Email :</strong> {patient?.email}</p>
            <p><MdEmail style={styles.fieldIcon} /> <strong>Email :</strong> {patient?.email}</p>
            <p><MdPhone style={styles.fieldIcon} /> <strong>Téléphone :</strong> {patient?.telephone}</p>
            <p><MdCake style={styles.fieldIcon} /> <strong>Date de naissance :</strong> {patient?.date_naissance}</p>
            <button style={styles.button} onClick={() => setEditMode(true)}>
              <MdEdit style={{ marginRight: 8 }} /> Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#eaf2f8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: 15,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: 550
  },
  icon: {
    fontSize: 90,
    color: '#3498db',
    marginBottom: 10
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 25
  },
  info: {
    textAlign: 'left',
    lineHeight: 2,
    fontSize: 17
  },
  fieldIcon: {
    color: '#007bdb',
    marginRight: 8,
    fontSize: 20
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '12px 15px',
    marginBottom: 18,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16,
    transition: 'border 0.3s ease'
  },
  button: {
    backgroundColor: '#007bdb',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 25,
    fontSize: 16,
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'background 0.3s ease'
  },
  form: {
    marginTop: 20,
    textAlign: 'left'
  }
};

export default PatientProfile;
