import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedecinOrdonnances = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [contenu, setContenu] = useState('');
    const token = localStorage.getItem("token");
    const medecinId = localStorage.getItem("medecin_id");
    console.log("Token:", token);
    console.log("Médecin ID:", medecinId);

    useEffect(() => {
        const fetchConfirmedPatients = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/rendezvous/medecin/${medecinId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // Filtrer les rendez-vous confirmés
                const confirmedAppointments = response.data.filter(rdv => rdv.statut === 'confirmé');

                // Extraire les patients uniques
                const uniquePatientsMap = {};
                confirmedAppointments.forEach(rdv => {
                    if (rdv.patient && !uniquePatientsMap[rdv.patient.id]) {
                        uniquePatientsMap[rdv.patient.id] = rdv.patient;
                    }
                });

                const uniquePatients = Object.values(uniquePatientsMap);
                setPatients(uniquePatients);
            } catch (error) {
                console.error("Erreur lors du chargement des rendez-vous confirmés :", error);
            }
        };
        fetchConfirmedPatients();
    }, [medecinId, token]);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setSearchTerm('');
    };

    const addOrdonnance = async (e) => {
        e.preventDefault();
        if (!selectedPatient || !contenu.trim()) return;
        try {
            await axios.post('http://127.0.0.1:8000/api/ordonnances', {
                medecin_id: medecinId,
                patient_id: selectedPatient.id,
                contenu,
                date_prescription: new Date().toISOString().split('T')[0],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            alert("Ordonnance ajoutée avec succès !");
            setSelectedPatient(null);
            setContenu('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'ordonnance:", error.response ? error.response.data : error);
            alert("Erreur lors de l'ajout de l'ordonnance.");
        }
    };

    const displayedPatients = searchTerm
        ? patients.filter(patient =>
            `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : patients;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Ajouter une ordonnance</h2>
            <input
                type="text"
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
            <div style={styles.patientList}>
                {displayedPatients.length > 0 ? (
                    displayedPatients.map((patient) => (
                        <div
                            key={patient.id}
                            onClick={() => handleSelectPatient(patient)}
                            style={{
                                ...styles.patientItem,
                                ...(selectedPatient?.id === patient.id ? styles.selectedPatientItem : {})
                            }}
                        >
                            {patient.nom} {patient.prenom}
                        </div>
                    ))
                ) : (
                    <div style={styles.noResults}>Aucun patient trouvé</div>
                )}
            </div>

            {selectedPatient && (
                <form onSubmit={addOrdonnance} style={styles.form}>
                    <h3 style={styles.selectedPatientTitle}>
                        Patient sélectionné : {selectedPatient.nom} {selectedPatient.prenom}
                    </h3>
                    <textarea
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Contenu de l'ordonnance..."
                        style={styles.textarea}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={!contenu.trim()}
                        style={{
                            ...styles.submitButton,
                            ...(contenu.trim() === '' ? styles.submitButtonDisabled : {})
                        }}
                    >
                        Ajouter l'ordonnance
                    </button>
                </form>
            )}
        </div>
    );
};

export default MedecinOrdonnances;

// Styles CSS in JS
const styles = {
    container: {
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: '40px auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '25px',
        textAlign: 'center',
    },
    searchInput: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        fontSize: '16px',
    },
    patientList: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginBottom: '25px',
        border: '1px solid #ddd',
        borderRadius: '6px',
    },
    patientItem: {
        padding: '12px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    selectedPatientItem: {
        backgroundColor: '#e0f7fa',
        fontWeight: 'bold',
    },
    noResults: {
        padding: '12px',
        color: '#999',
        textAlign: 'center',
    },
    selectedPatientTitle: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#007bdb',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    textarea: {
        width: '100%',
        minHeight: '120px',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical',
    },
    submitButton: {
        padding: '12px',
        backgroundColor: '#007bdb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
};
