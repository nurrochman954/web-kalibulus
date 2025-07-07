'use client';

import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Preload image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = 'assets/hero.jpeg';
    
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
      className="relative min-h-screen flex items-start justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('assets/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`,
        filter: isLoaded ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.8)',
        transition: 'filter 0.3s ease-in-out',
        marginTop: 0,
        paddingTop: '120px' // Increased from 80px to move content higher
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
        paddingTop: '4rem', // Reduced from 8rem to 4rem to move text up
        textAlign: 'center'
      }}>
        <div style={{ animation: 'fade-in 1s ease-out' }}>
          <h1 
            style={{ 
              fontFamily: 'BODAR, Lato, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Selamat Datang di</span>
            <span 
              style={{ 
                display: 'block',
                color: 'white'
              }}
            >
              Website Dusun Kalibulus
            </span>
          </h1>
          
          <p 
            style={{ 
              fontFamily: 'Lato, sans-serif',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              lineHeight: '1.4',
              marginBottom: '2rem',
              color: 'white',
              maxWidth: '80%',
              margin: '0 auto 2rem auto'
            }}
          >
            Gerbang digital untuk semua informasi, layanan, dan cerita
          </p>

          {/* Additional small text */}
          <p 
            style={{ 
              fontFamily: 'Lato, sans-serif',
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem',
              lineHeight: '1.3',
              animation: 'fade-in-delay 1s ease-out 0.6s both'
            }}
          >
          </p>
        </div>
      </div>

      {/* Interactive Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-pulse transition-all duration-300 group cursor-pointer"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white mb-1 sm:mb-2 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          <div className="w-1 h-6 bg-white/60 group-hover:bg-white/80 rounded-full transition-colors duration-300"></div>
        </div>
      </button>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-2 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1s ease-out 0.6s both;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          #hero {
            min-height: 100vh;
            min-height: 100svh; /* For mobile browsers */
            padding-top: 100px; /* Smaller padding for mobile */
          }
          
          #hero > div {
            padding-top: 2rem !important; /* Even less padding on mobile */
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
      `}</style>
    </section>
  );
};

export default Hero;