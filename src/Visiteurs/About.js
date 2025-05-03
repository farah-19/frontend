import React, { useState } from 'react';
import backgroundVideo from '../Images/video.mp4'; // ta vidéo
import { FaStethoscope, FaCalendarCheck, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      icon: <FaStethoscope style={styles.icon} />,
      title: "Accès aux soins",
      description: "Trouvez facilement un médecin et prenez rendez-vous en ligne."
    },
    {
      icon: <FaCalendarCheck style={styles.icon} />,
      title: "Planification simplifiée",
      description: "Les médecins gèrent leurs plannings sans stress ni appels téléphoniques."
    },
    {
      icon: <FaUsers style={styles.icon} />,
      title: "Communauté connectée",
      description: "Un lien direct entre patients et professionnels de santé."
    },
    {
      icon: <FaStethoscope style={styles.icon} />,
      title: "Médecins spécialisés",
      description: "Accédez à une grande variété de médecins spécialisés dans divers domaines."
    },
    {
      icon: <FaCalendarCheck style={styles.icon} />,
      title: "Notifications en temps réel",
      description: "Recevez des alertes instantanées sur vos rendez-vous et changements."
    },
    {
      icon: <FaUsers style={styles.icon} />,
      title: "Espace personnel",
      description: "Gérez vos rendez-vous et vos historiques médicaux depuis votre espace sécurisé."
    }
  ];

  const maxVisibleCards = 3;
  const totalCards = cards.length;

  const nextSlide = () => {
    if (currentIndex + maxVisibleCards < totalCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section style={styles.section}>
      <video style={styles.video} autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div style={styles.overlay}></div>

      <div style={styles.overlayContent}>
        <h2 style={styles.title}>À propos de MedConnect</h2>

        <div style={styles.sliderContainer}>
          <div
            style={{
              ...styles.grid,
              transform: `translateX(-${currentIndex * 330}px)`,
              transition: 'transform 0.5s ease',
              width: `${cards.length * 330}px`, // 300px card + 30px gap
            }}
          >
            {cards.map((card, index) => (
              <div key={index} style={styles.card}>
                {card.icon}
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.text}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.pagination}>
          <button
            style={{
              ...styles.paginationButton,
              ...(currentIndex === 0 ? styles.disabledButton : {})
            }}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </button>
          <button
            style={{
              ...styles.paginationButton,
              ...(currentIndex + maxVisibleCards >= totalCards ? styles.disabledButton : {})
            }}
            onClick={nextSlide}
            disabled={currentIndex + maxVisibleCards >= totalCards}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  overlayContent: {
    position: 'relative',
    zIndex: 2,
    color: 'white',
    textAlign: 'center',
    padding: '40px',
    maxWidth: '1200px',
    width: '100%',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  sliderContainer: {
    overflow: 'hidden',
    position: 'relative',
    width: '990px', // 3 cards * 300px + 2 gaps * 30px
    margin: '0 auto',
  },
  grid: {
    display: 'flex',
    gap: '30px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 0.3s ease',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    color: '#eee',
  },
  icon: {
    fontSize: '40px',
    color: '#58A6FF',
    marginBottom: '15px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  paginationButton: {
    backgroundColor: '#58A6FF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
};

export default About;
