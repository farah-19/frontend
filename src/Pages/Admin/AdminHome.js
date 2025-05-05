import React, { useState, useEffect } from 'react';

const Statistics = () => {
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalMedecins: 0,
        totalRendezVous: 0,
        scheduledAppointments: 0,
        confirmedAppointments: 0,
        cancelledAppointments: 0,
        completedPrescriptions: 0,
        mostRequestedSpecialty: '',
    });
    const adminId = localStorage.getItem('admin_id');
    console.log("Admin ID:", adminId);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/stats')
            .then((response) => response.json())
            .then((data) => setStats(data));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📊 Statistiques Médicales</h2>
            <div style={styles.statsContainer}>
                <StatCard title="Total Patients" value={stats.totalPatients} />
                <StatCard title="Total Médecins" value={stats.totalMedecins} />
                <StatCard title="Total Rendez-vous" value={stats.totalRendezVous} />
            </div>
            <div style={styles.statsContainer}>
                <StatCard title="Rendez-vous Programmé" value={stats.scheduledAppointments} />
                <StatCard title="Rendez-vous Confirmé" value={stats.confirmedAppointments} />
                <StatCard title="Rendez-vous Annulé" value={stats.cancelledAppointments} />
            </div>
            <div style={styles.statsContainer}>
                <StatCard title="Prescriptions Complètes" value={stats.completedPrescriptions} />
                <StatCard title="Spécialité la Plus Demandée" value={stats.mostRequestedSpecialty} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div style={styles.statItem}>
        <h3 style={styles.statTitle}>{title}</h3>
        <p style={styles.statValue}>{value}</p>
    </div>
);

const styles = {
    container: {
        padding: '40px 20px 20px 20px',
        backgroundColor: '#f0f4f8',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        width: '90%',
        margin: '60px auto 30px auto', // Espace avec la navbar
    },
    header: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '40px',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '25px',
    },
    statItem: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
        flex: '1 1 250px',
        transition: 'transform 0.2s ease-in-out',
    },
    statItemHover: {
        transform: 'scale(1.03)',
    },
    statTitle: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#555',
        marginBottom: '10px',
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#3498db',
    },
};

export default Statistics;
