import React from 'react';
import styles from './JelajahiDusun.module.css';

const ExploreCard = ({ title, icon, link }: {
  title: string;
  icon: string;
  link: string;
}) => {
  return (
    <a href={link} className={styles.exploreCard}>
      {/* Icon Container */}
      <div className={styles.iconContainer}>
        <div className={styles.cardIcon}>
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className={styles.cardTitle}>
        {title}
      </h3>
    </a>
  );
};

interface JelajahiDusunProps {
  title?: string;
  description?: string;
  cards?: Array<{
    title: string;
    icon: string;
    link: string;
  }>;
}

const JelajahiDusun: React.FC<JelajahiDusunProps> = ({ 
  title = "Jelajahi Dusun",
  description = "Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan dusun, penduduk, demografi, potensi dusun, dan juga berita tentang dusun.",
  cards = [
    {
      title: "Profil Dusun",
      icon: "🏛️",
      link: "#profil"
    },
    {
      title: "Infografis", 
      icon: "📊",
      link: "#infografis"
    },
    {
      title: "Edukasi Masyarakat",
      icon: "📚",
      link: "#edukasi"
    },
    {
      title: "Berita Dusun",
      icon: "📰",
      link: "#berita"
    }
  ]
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    const section = document.getElementById('explore');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      {/* Spacer */}
      <div style={{ height: '5vh', background: 'transparent' }} />
      
      <section 
        id="explore" 
        className={styles.jelajahiSection}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        }}
      >
        <div className={styles.container}>
          <div className={styles.mainContent}>
            {/* Text Content */}
            <div 
              className={styles.textContent}
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}
            >
              <h2 className={styles.sectionTitle}>
                {title}
              </h2>
              <p className={styles.sectionDescription}>
                {description}
              </p>
            </div>
            
            {/* Cards Container */}
            <div 
              className={styles.cardsContainer}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}
            >
              {/* Desktop Zigzag Layout */}
              <div className={styles.cardsDesktop}>
                {cards.map((card, index) => (
                  <div 
                    key={index}
                    className={styles[`cardPosition${index + 1}`]}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + (index * 0.2)}s`
                    }}
                  >
                    <ExploreCard 
                      title={card.title}
                      icon={card.icon}
                      link={card.link}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Grid Layout */}
              <div className={styles.cardsMobile}>
                {cards.map((card, index) => (
                  <div key={index} className={styles.mobileCard}>
                    <div style={{
                      background: '#E0F2FE',
                      borderRadius: '20px',
                      padding: '20px',
                      marginBottom: '12px',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ fontSize: '32px' }}>
                        {card.icon}
                      </div>
                    </div>
                    <h3 style={{
                      color: '#374151',
                      fontWeight: '600',
                      fontSize: '12px',
                      margin: '0',
                      lineHeight: '1.3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      textAlign: 'center'
                    }}>
                      {card.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JelajahiDusun;