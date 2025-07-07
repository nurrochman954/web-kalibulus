import React from 'react';

const AdministrasiPenduduk = ({ 
  title = "Administrasi Penduduk",
  statsData = [
    { number: "??????", label: "Penduduk" },
    { number: "??????", label: "Laki-laki" },
    { number: "??????", label: "Kepala Keluarga" },
    { number: "??????", label: "Perempuan" }
  ]
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

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

    const section = document.getElementById('administration');
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
      id="administration" 
      style={{
        padding: isMobile ? '40px 20px' : '60px 20px',
        background: 'white',
        position: 'relative'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        {/* Section Title */}
        <h2 style={{
          color: '#0891b2',
          fontWeight: 'bold',
          fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
          lineHeight: '1.2',
          marginBottom: isMobile ? '40px' : '60px',
          textAlign: isMobile ? 'center' : 'left',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {title}
        </h2>
        
        {/* Stats Grid - 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '20px' : '24px',
          marginBottom: '40px',
          maxWidth: isMobile ? '100%' : '900px',
          margin: '0 auto'
        }}>
          {statsData.map((stat, index) => (
            <StatCard 
              key={index}
              number={stat.number}
              label={stat.label}
              index={index}
              isVisible={isVisible}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

const StatCard = ({ number, label, index, isVisible, isMobile }: {
  number: string;
  label: string;
  index: number;
  isVisible: boolean;
  isMobile: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        height: isMobile ? '100px' : '120px',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(8, 145, 178, 0.25)' 
          : '0 8px 24px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isVisible 
          ? (isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
          : 'translateY(40px) scale(0.9)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 150}ms`,
        cursor: 'pointer',
        border: '2px solid transparent',
        borderColor: isHovered ? '#0891b2' : 'transparent',
        position: 'relative'
      }}
    >
      {/* Animated background effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `conic-gradient(from 0deg, transparent, ${isHovered ? '#0891b2' : 'transparent'}05, transparent)`,
        opacity: isHovered ? 0.3 : 0,
        transition: 'opacity 0.4s ease',
        animation: isHovered ? 'spin 3s linear infinite' : 'none'
      }} />

      {/* Number Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15
        }}>
          <svg 
            style={{ width: '100%', height: '100%' }} 
            viewBox="0 0 100 100" 
            fill="none"
          >
            <circle cx="25" cy="25" r="12" fill="currentColor" />
            <circle cx="75" cy="75" r="8" fill="currentColor" />
            <circle cx="70" cy="25" r="6" fill="currentColor" />
            <circle cx="25" cy="75" r="10" fill="currentColor" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>
        
        {/* Animated glow effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${isHovered ? '0.25' : '0'}) 0%, transparent 70%)`,
          transition: 'all 0.4s ease'
        }} />
        
        <span style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: isMobile ? 'clamp(1.2rem, 4vw, 1.8rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10,
          transform: isHovered ? 'scale(1.1) rotate(-2deg)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}>
          {number}
        </span>

        {/* Corner decoration */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.3)',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
      
      {/* Label Section */}
      <div style={{
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        position: 'relative',
        padding: isMobile ? '0 12px' : '0 16px'
      }}>
        <span style={{
          color: '#0891b2',
          fontWeight: 'bold',
          fontSize: isMobile ? 'clamp(0.85rem, 3vw, 1.1rem)' : 'clamp(1rem, 2.5vw, 1.5rem)',
          textAlign: 'center',
          lineHeight: '1.3',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          textShadow: isHovered ? '0 1px 3px rgba(8, 145, 178, 0.2)' : 'none'
        }}>
          {label}
        </span>
        
        {/* Left accent line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '25%',
          bottom: '25%',
          width: '4px',
          background: 'linear-gradient(to bottom, #0891b2, #06b6d4)',
          borderRadius: '0 4px 4px 0',
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'center'
        }} />
        
        {/* Top right indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#0891b2',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />

        {/* Bottom accent */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '20%',
          right: '20%',
          height: '3px',
          background: 'linear-gradient(to right, transparent, #0891b2, transparent)',
          borderRadius: '2px 2px 0 0',
          opacity: isHovered ? 0.6 : 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default AdministrasiPenduduk;