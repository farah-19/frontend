import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function MedecinCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const medecinId = localStorage.getItem('medecinId'); // Assuming you store the medecin ID in local storage

  useEffect(() => {
    fetch(`/api/rendezvous/medecin/${medecinId}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(rd => ({
          title: rd.patient_name || 'Rendez-vous',
          start: new Date(rd.date),
          end: new Date(moment(rd.date).add(30, 'minutes')),
          ...rd
        }));
        setEvents(formatted);
      });
  }, [medecinId]);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
  };

  const closeModal = () => setSelectedEvent(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mes Rendez-vous</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={styles.calendar}
      />

      {selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Détails du Rendez-vous</h3>
            <p><strong>Patient :</strong> {selectedEvent.patient_name}</p>
            <p><strong>Date :</strong> {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
            <p><strong>Note :</strong> {selectedEvent.note || 'Aucune note'}</p>
            <button onClick={closeModal} style={styles.buttonClose}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333'
  },
  calendar: {
    height: '600px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  modalTitle: {
    marginBottom: '15px'
  },
  buttonClose: {
    marginTop: '15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};
