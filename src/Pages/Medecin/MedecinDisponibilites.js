import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisponibilitesMedecin = () => {
    const [disponibilites, setDisponibilites] = useState([]);
    const [date, setDate] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [notes, setNotes] = useState('');
    const [jour, setJour] = useState('');
    const token = localStorage.getItem("token");
    const medecinId = localStorage.getItem("medecin_id");

    useEffect(() => {
        fetchDisponibilites();
    }, []);

    const fetchDisponibilites = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/disponibilites', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.filter(d => d.medecin_id == medecinId);
            setDisponibilites(data);
        } catch (error) {
            console.error("Erreur lors du chargement des disponibilités :", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!date || !heureDebut || !heureFin) return;

        try {
            await axios.post('http://127.0.0.1:8000/api/disponibilites', {
                medecin_id: medecinId,
                date,
                heure_debut: heureDebut,
                heure_fin: heureFin,
                jour,
                notes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDisponibilites();
            setDate('');
            setHeureDebut('');
            setHeureFin('');
            setNotes('');
            setJour('');
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error.response?.data || error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cette disponibilité ?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/disponibilites/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDisponibilites(disponibilites.filter(d => d.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestion des disponibilités</h2>

            <form onSubmit={handleAdd} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Date :</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            const selectedDate = e.target.value;
                            setDate(selectedDate);
                            setJour(getJourFromDate(selectedDate));
                        }}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Jour :</label>
                    <input
                        type="text"
                        value={jour}
                        readOnly
                        style={{ ...styles.input, backgroundColor: '#f1f1f1' }}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Heure de début :</label>
                    <input
                        type="time"
                        value={heureDebut}
                        onChange={(e) => setHeureDebut(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Heure de fin :</label>
                    <input
                        type="time"
                        value={heureFin}
                        onChange={(e) => setHeureFin(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Notes :</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notes optionnelles"
                        style={styles.textarea}
                    ></textarea>
                </div>
                <button type="submit" style={styles.addButton}>Ajouter</button>
            </form>

            <h3 style={styles.subtitle}>Mes disponibilités</h3>
            {disponibilites.length > 0 ? (
                <ul style={styles.list}>
                    {disponibilites.map((dispo) => (
                        <li key={dispo.id} style={styles.listItem}>
                            <div>
                                📅 <strong>{dispo.date}</strong> ({dispo.jour})<br />
                                🕒 {dispo.heure_debut} - {dispo.heure_fin}
                                {dispo.notes && <p>📝 {dispo.notes}</p>}
                            </div>
                            <button onClick={() => handleDelete(dispo.id)} style={styles.deleteButton}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune disponibilité enregistrée.</p>
            )}
        </div>
    );
};

export default DisponibilitesMedecin;

// 🔧 Fonction pour obtenir le jour depuis une date
const getJourFromDate = (dateString) => {
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dateObj = new Date(dateString);
    return jours[dateObj.getDay()];
};

// 🎨 Styles
const styles = {
    container: {
        maxWidth: '700px',
        margin: '40px auto',
        padding: '25px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '26px',
        textAlign: 'center',
        marginBottom: '25px',
        color: '#007bff'
    },
    form: {
        marginBottom: '30px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        resize: 'vertical',
    },
    addButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    subtitle: {
        fontSize: '20px',
        marginBottom: '15px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '8px'
    },
    list: {
        listStyle: 'none',
        paddingLeft: 0,
    },
    listItem: {
        padding: '15px',
        marginBottom: '10px',
        border: '1px solid #eee',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9'
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};
