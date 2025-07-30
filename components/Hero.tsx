'use client';

import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Preload image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = 'assets/hero2.jpg';
    
    // Preload font
    const loadFont = async () => {
      try {
        const font = new FontFace('BODAR', 'url(assets/fonts/BODAR.ttf)');
        await font.load();
        document.fonts.add(font);
        setFontLoaded(true);
      } catch {
        console.log('Font loading failed, using fallback');
        setFontLoaded(true); // Still show content with fallback
      }
    };
    
    loadFont();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector('#content') || document.querySelector('main');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('assets/hero2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 80%',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.3}px)`,
        filter: isLoaded ? 'brightness(1.05) contrast(1.1)' : 'brightness(0.8)',
        transition: 'filter 0.7s ease-in-out',
        marginTop: 0
      }}
    >      
      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        color: 'white', 
        maxWidth: '100%', 
        width: '100%',
        padding: '0 2rem',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <div style={{ 
          animation: 'fade-in 1.2s ease-out',
          opacity: fontLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}>
          <h1 
            style={{ 
              fontFamily: 'BODAR, serif',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: '0.01em'
            }}
          >
            <span style={{ 
              display: 'block', 
              marginBottom: '0.8rem',
              fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
              fontWeight: 'normal',
              opacity: '0.95'
            }}>
              Selamat Datang di
            </span>
            <span 
              style={{ 
                display: 'block',
                color: 'white',
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                fontWeight: 'bold',
                textShadow: '4px 4px 8px rgba(0,0,0,0.8)'
              }}
            >
              Website Dusun Kalibulus
            </span>
          </h1>
        </div>
      </div>

      {/* Interactive Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-pulse transition-all duration-300 group cursor-pointer"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center">
          <svg 
            className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white mb-2 transition-colors duration-300 drop-shadow-lg" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          <div className="w-1 h-8 bg-white/70 group-hover:bg-white/90 rounded-full transition-colors duration-300 drop-shadow-lg"></div>
        </div>
      </button>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      <style jsx>{`
        @font-face {
          font-family: 'BODAR';
          src: url('assets/fonts/BODAR.ttf') format('truetype');
          font-display: block;
          font-weight: normal;
          font-style: normal;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Desktop optimizations */
        @media (min-width: 1024px) {
          #hero {
            background-position: center 80% !important;
            min-height: 100vh;
          }
          
          #hero > div {
            margin-top: -120px !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1023px) {
          #hero {
            background-position: center 40% !important;
            min-height: 100vh;
          }
          
          #hero > div {
            margin-top: 50px !important;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          #hero {
            min-height: 80vh;
            min-height: 80svh;
            background-attachment: scroll !important;
            background-position: center 20% !important;
            background-size: cover !important;
            align-items: flex-start !important;
            padding-top: 80px;
          }
          
          #hero > div {
            padding: 0 1.5rem !important;
            margin-top: 60px !important;
          }
          
          h1 {
            margin-bottom: 2rem !important;
          }
          
          h1 span:first-child {
            font-size: clamp(1.2rem, 5vw, 1.8rem) !important;
            margin-bottom: 0.6rem !important;
          }
          
          h1 span:last-child {
            font-size: clamp(1.8rem, 7vw, 2.8rem) !important;
            line-height: 1.2 !important;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 480px) {
          #hero {
            padding-top: 70px !important;
            background-position: center 25% !important;
            min-height: 75vh !important;
            min-height: 75svh !important;
          }
          
          #hero > div {
            padding: 0 1rem !important;
            margin-top: 50px !important;
          }
          
          h1 span:first-child {
            font-size: clamp(1rem, 4.5vw, 1.5rem) !important;
            margin-bottom: 0.5rem !important;
          }
          
          h1 span:last-child {
            font-size: clamp(1.6rem, 6.5vw, 2.4rem) !important;
            line-height: 1.25 !important;
          }
        }

        /* Landscape mobile */
        @media (max-width: 896px) and (max-height: 414px) and (orientation: landscape) {
          #hero {
            min-height: 100vh;
            background-position: center center !important;
            padding-top: 60px !important;
          }
          
          #hero > div {
            margin-top: 20px !important;
          }
          
          h1 span:first-child {
            font-size: clamp(1rem, 3vw, 1.4rem) !important;
          }
          
          h1 span:last-child {
            font-size: clamp(1.5rem, 4vw, 2.2rem) !important;
          }
        }

        /* Prevent text selection on buttons */
        button {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }

        /* Ensure text remains centered on all devices */
        h1, p {
          text-align: center !important;
        }

        /* Improve text rendering */
        h1 {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Better contrast for readability */
        h1 {
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));
        }

        /* Ensure proper aspect ratio maintenance */
        #hero {
          background-repeat: no-repeat;
        }
      `}</style>
    </section>
  );
};

export default Hero;