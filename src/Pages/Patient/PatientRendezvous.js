import React, { useState, useEffect } from 'react';

const RechercheRendezVous = () => {
    const [ville, setVille] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [dateSouhaitee, setDateSouhaitee] = useState('');
    const [villes, setVilles] = useState([]);
    const [specialites, setSpecialites] = useState([]);
    const [medecins, setMedecins] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const patientId = localStorage.getItem('patient_id');

    useEffect(() => {
        fetch('http://localhost:8000/api/villes', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setVilles(data))
            .catch(err => console.error('Erreur chargement villes :', err));

        fetch('http://localhost:8000/api/specialites', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setSpecialites(data))
            .catch(err => console.error('Erreur chargement spécialités :', err));
    }, [token]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/medecins?ville_id=${ville}&specialite_id=${specialite}&date=${dateSouhaitee}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Erreur lors de la recherche');

            const data = await response.json();
            setMedecins(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const prendreRendezVous = async (medecinId) => {
        if (!dateSouhaitee || !medecinId || !patientId) {
            setMessage('Veuillez remplir tous les champs pour prendre un rendez-vous.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/rendezvous`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    patient_id: patientId,
                    medecin_id: medecinId,
                    date_heure: dateSouhaitee,
                    statut: 'en attente'
                })
            });

            if (!response.ok) throw new Error('Erreur lors de la prise de rendez-vous');

            setMessage('Rendez-vous pris avec succès !');
        } catch (error) {
            setMessage("Erreur : " + error.message);
        }
    };

    const getVilleNameById = (id) => {
        const ville = villes.find(v => v.id === id);
        return ville ? ville.nom : 'Inconnu';
    };

    const getSpecialiteNameById = (id) => {
        const specialite = specialites.find(s => s.id === id);
        return specialite ? specialite.nom : 'Inconnu';
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Rechercher un médecin</h2>

            <div style={styles.form}>
                <select value={ville} onChange={(e) => setVille(e.target.value)} style={styles.input}>
                    <option value="">Sélectionner ville</option>
                    {villes.map((v) => (
                        <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                </select>

                <select value={specialite} onChange={(e) => setSpecialite(e.target.value)} style={styles.input}>
                    <option value="">Sélectionner spécialité</option>
                    {specialites.map((s) => (
                        <option key={s.id} value={s.id}>{s.nom}</option>
                    ))}
                </select>

                <input
                    type="datetime-local"
                    value={dateSouhaitee}
                    onChange={(e) => setDateSouhaitee(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleSearch} style={styles.button}>Rechercher</button>
            </div>

            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.results}>
                {medecins.length > 0 ? (
                    medecins.map((medecin) => (
                        <div key={medecin.id} style={styles.card}>
                            <img
                                src={`http://127.0.0.1:8000/storage/uploads/${medecin.photo}`}
                                alt={`Dr. ${medecin.nom} ${medecin.prenom}`}
                                style={styles.image}
                            />
                            <h3>Dr. {medecin.nom} {medecin.prenom}</h3>
                            <p><strong>Ville :</strong> {getVilleNameById(medecin.ville_id)}</p>
                            <p><strong>Spécialité :</strong> {getSpecialiteNameById(medecin.specialite_id)}</p>
                            <button
                                onClick={() => prendreRendezVous(medecin.id)}
                                style={styles.rdvButton}
                            >
                                Prendre rendez-vous
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={styles.noResults}>Aucun médecin trouvé.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: 40, backgroundColor: '#f4f9ff', minHeight: '100vh', fontFamily: 'Arial' },
    title: { textAlign: 'center', fontSize: 26, marginBottom: 30, color: '#2c3e50' },
    form: { display: 'flex', gap: 10, marginBottom: 30, justifyContent: 'center', flexWrap: 'wrap' },
    input: { padding: 10, borderRadius: 6, border: '1px solid #ccc', minWidth: 180 },
    button: { backgroundColor: '#007bdb', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: 8, cursor: 'pointer' },
    results: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    rdvButton: { marginTop: 10, backgroundColor: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 6, cursor: 'pointer' },
    noResults: { textAlign: 'center', fontStyle: 'italic', color: '#888' },
    message: { textAlign: 'center', color: '#28a745', fontWeight: 'bold', marginBottom: 20 },
    image: {
        width: '100%',
        height: 180,
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: 10
    }
};

export default RechercheRendezVous;
