import React from 'react';

const PetaDusun = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

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
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    const section = document.getElementById('peta-dusun');
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
    <section 
      id="peta-dusun"
      style={{
        padding: isMobile ? '60px 20px 10px 20px' : '80px 20px 10px 20px',
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
        {/* Section Title */}
        <h2 style={{
          color: '#0891b2',
          fontWeight: 'bold',
          fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
          lineHeight: '1.2',
          marginBottom: isMobile ? '40px' : '60px',
          textAlign: isMobile ? 'center' : 'left',
          letterSpacing: '0px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          Peta Dusun
        </h2>
        
        {/* Map Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
        }}>
          <div 
            style={{
              position: 'relative',
              background: 'white',
              borderRadius: '24px',
              padding: isMobile ? '32px 24px' : '48px 40px',
              maxWidth: isMobile ? '100%' : '800px',
              width: '100%',
              boxShadow: isHovered 
                ? '0 20px 60px rgba(8, 145, 178, 0.2), 0 8px 24px rgba(0, 0, 0, 0.12)' 
                : '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
              border: '2px solid',
              borderColor: isHovered ? '#0891b2' : '#e5e7eb',
              transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `conic-gradient(from 0deg, transparent, ${isHovered ? '#0891b2' : 'transparent'}08, transparent)`,
              opacity: isHovered ? 0.08 : 0,
              transition: 'opacity 0.4s ease',
              animation: isHovered ? 'spin 4s linear infinite' : 'none'
            }} />

            {/* Map Image Container */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#f8fafc',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease'
            }}>
              <img 
                src="assets/logo-peta.png" 
                alt="Peta Dusun Kalibulus" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: isMobile ? '300px' : '400px',
                  borderRadius: '12px',
                  filter: isHovered ? 'brightness(1.05) saturate(1.1)' : 'brightness(1)',
                  transition: 'filter 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>

            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: '#E0F2FE',
              borderRadius: '50%',
              opacity: isHovered ? 1 : 0.6,
              transform: isHovered ? 'scale(1.2) rotate(180deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🗺️
            </div>

            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '32px',
              height: '32px',
              background: '#0891b2',
              borderRadius: '50%',
              opacity: isHovered ? 1 : 0.4,
              transform: isHovered ? 'scale(1.3) rotate(-180deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
            }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default PetaDusun;