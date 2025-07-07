import React from 'react';

const ExploreCard = ({ title, icon, link, index }: {
  title: string;
  icon: string;
  link: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <a 
      href={link} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHovered ? '#f8fafc' : 'white',
        borderRadius: '20px',
        padding: '24px 16px',
        boxShadow: isHovered 
          ? '0 12px 32px rgba(0, 0, 0, 0.15)' 
          : '0 6px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        textDecoration: 'none',
        color: 'inherit',
        border: '2px solid',
        borderColor: isHovered ? '#059669' : '#e5e7eb',
        cursor: 'pointer',
        width: '100%',
        minHeight: '200px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `conic-gradient(from 0deg, transparent, ${isHovered ? '#0891b2' : 'transparent'}10, transparent)`,
        opacity: isHovered ? 0.1 : 0,
        transition: 'opacity 0.4s ease',
        animation: isHovered ? 'spin 3s linear infinite' : 'none'
      }} />
      
      {/* Icon Container */}
      <div style={{
        background: '#E0F2FE',
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '20px',
        transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered ? '0 12px 28px rgba(8, 145, 178, 0.3)' : '0 6px 16px rgba(8, 145, 178, 0.1)',
        position: 'relative',
        zIndex: 2,
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          filter: isHovered ? 'brightness(1.2) saturate(1.3)' : 'brightness(1)',
          transition: 'filter 0.3s ease'
        }}>
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 style={{
        color: '#374151',
        fontWeight: '600',
        fontSize: '15px',
        margin: '0',
        lineHeight: '1.3',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
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
  const [isMobile, setIsMobile] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px 0px' // Start animation 50px before component comes into view
      }
    );

    const section = document.getElementById('explore');
    if (section) {
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      {/* Reduced Spacer - Gap dikurangi dari 20vh menjadi 5vh */}
      <div style={{ height: '5vh', background: 'transparent' }} />
      
      <section 
        id="explore" 
        style={{
          padding: isMobile ? '40px 20px' : '50px 20px', // Padding atas dikurangi dari 80px
          background: 'white',
          position: 'relative',
          zIndex: 10,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative'
        }}>
          {isMobile ? (
            // Mobile Layout
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '40px',
              alignItems: 'flex-start'
            }}>
              {/* Text Content */}
              <div style={{ 
                width: '100%',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}>
                <h2 style={{
                  color: '#0891b2',
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.8rem, 6vw, 2.2rem)',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                  letterSpacing: '0px'
                }}>
                  {title}
                </h2>
                <p style={{
                  fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                  lineHeight: '1.6',
                  color: '#374151',
                  fontWeight: '400',
                  marginBottom: '0'
                }}>
                  {description}
                </p>
              </div>
              
              {/* Cards Grid for Mobile */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                width: '100%',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '24px 16px',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                      border: '2px solid #f1f5f9',
                      minHeight: '160px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
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
          ) : (
            // Desktop Layout - Zigzag
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '80px'
            }}>
              {/* Text Content - Left Side */}
              <div style={{ 
                flex: '1',
                maxWidth: '450px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}>
                <h2 style={{
                  color: '#0891b2',
                  fontWeight: 'bold',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  lineHeight: '1.1',
                  marginBottom: '32px',
                  letterSpacing: '0px'
                }}>
                  {title}
                </h2>
                <p style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  lineHeight: '1.7',
                  color: '#374151',
                  fontWeight: '400'
                }}>
                  {description}
                </p>
              </div>
              
              {/* Cards - Right Side with Zigzag Layout */}
              <div style={{
                flex: '1',
                position: 'relative',
                height: '450px',
                maxWidth: '500px',
                minWidth: '450px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}>
                {/* Card 1 - Top Left */}
                <div style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  left: '0px', 
                  width: '200px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
                }}>
                  <ExploreCard 
                    title={cards[0].title}
                    icon={cards[0].icon}
                    link={cards[0].link}
                    index={0}
                  />
                </div>
                
                {/* Card 2 - Top Right */}
                <div style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  right: '0px', 
                  width: '200px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
                }}>
                  <ExploreCard 
                    title={cards[1].title}
                    icon={cards[1].icon}
                    link={cards[1].link}
                    index={1}
                  />
                </div>
                
                {/* Card 3 - Bottom Left (shifted more right) */}
                <div style={{ 
                  position: 'absolute', 
                  top: '250px', 
                  left: '80px', 
                  width: '200px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s'
                }}>
                  <ExploreCard 
                    title={cards[2].title}
                    icon={cards[2].icon}
                    link={cards[2].link}
                    index={2}
                  />
                </div>
                
                {/* Card 4 - Bottom Right (shifted even more right) */}
                <div style={{ 
                  position: 'absolute', 
                  top: '250px', 
                  right: '-80px', 
                  width: '200px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s'
                }}>
                  <ExploreCard 
                    title={cards[3].title}
                    icon={cards[3].icon}
                    link={cards[3].link}
                    index={3}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
};

export default JelajahiDusun;