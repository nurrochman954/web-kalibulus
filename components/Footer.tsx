import React, { useState, useEffect } from 'react';

const Footer = ({ 
  logoImage = "/assets/logo-kab-sleman.png",
  logoAlt = "Logo Dusun Kalibulus",
  address = {
    line1: "Dusun Kalibulus, Kalurahan Bimomartani",
    line2: "Kapanewon Ngemplak, Kabupaten Sleman", 
    line3: "Daerah Istimewa Yogyakarta"
  },
  copyright = "© 2025. All rights reserved.",
  links = [
    { label: "Website Kalurahan Bimomartani", href: "https://bimomartanisid.slemankab.go.id/" },
    { label: "Website Kapanewon Ngemplak", href: "https://ngemplak.slemankab.go.id/" }
  ]
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isLarge: false,
    isMedium: false,
    isSmall: true
  });

  useEffect(() => {
    setIsMounted(true);
    
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isLarge: width >= 1024,
        isMedium: width >= 768,
        isSmall: width >= 640
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Default mobile-first styles for SSR
  const getResponsiveStyles = () => {
    if (!isMounted) {
      return {
        gridCols: '1fr',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        textAlign: 'center' as React.CSSProperties['textAlign'],
        alignItems: 'center' as React.CSSProperties['alignItems'],
        justifyContent: 'center' as React.CSSProperties['justifyContent']
      };
    }

    return {
      gridCols: screenSize.isLarge ? '1fr 1fr' : '1fr',
      flexDirection: (screenSize.isSmall ? 'row' : 'column') as React.CSSProperties['flexDirection'],
      textAlign: (screenSize.isLarge ? 'right' : 'center') as React.CSSProperties['textAlign'],
      alignItems: (screenSize.isLarge ? 'flex-end' : 'center') as React.CSSProperties['alignItems'],
      justifyContent: (screenSize.isMedium ? 'flex-end' : 'center') as React.CSSProperties['justifyContent']
    };
  };

  const styles = getResponsiveStyles();

  return (
    <footer style={{
      background: 'linear-gradient(to right, #22d3ee, #0891b2, #0e7490)',
      color: 'white',
      padding: '2rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: styles.gridCols,
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          
          {/* Left Section - Logo and Address */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: styles.flexDirection === 'row' ? 'left' : 'center' as React.CSSProperties['textAlign'],
            flexDirection: styles.flexDirection
          }}>
            {/* Logo */}
            <div style={{ flexShrink: 0 }}>
              <img 
                src={logoImage} 
                alt={logoAlt} 
                style={{
                  width: '80px',
                  height: '96px',
                  transition: 'transform 0.3s ease',
                  filter: 'brightness(1.1)'
                }}
                onMouseEnter={(e) => (e.target as HTMLImageElement).style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => (e.target as HTMLImageElement).style.transform = 'scale(1)'}
              />
            </div>
            
            {/* Address */}
            <div>
              <div style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>{address.line1}</div>
                <div>{address.line2}</div>
                <div>{address.line3}</div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Navigation Links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: styles.alignItems,
            textAlign: styles.textAlign
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Jelajahi:
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'white';
                    (e.target as HTMLAnchorElement).style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'rgba(255, 255, 255, 0.85)';
                    (e.target as HTMLAnchorElement).style.textDecoration = 'none';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Bottom Section - Copyright Only */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Copyright - Centered */}
          <div style={{
            textAlign: 'center'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              margin: 0
            }}>
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;