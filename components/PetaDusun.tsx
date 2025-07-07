import React from 'react';
import Image from 'next/image';
import styles from './PetaDusun.module.css';

const PetaDusun = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
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
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="peta-dusun"
      className={styles.petaDusunSection}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      }}
    >
      <div className={styles.container}>
        {/* Section Title */}
        <h2 
          className={styles.sectionTitle}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          }}
        >
          Peta Dusun
        </h2>
        
        {/* Map Container */}
        <div 
          className={styles.mapWrapper}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          }}
        >
          <div className={styles.mapContainer}>
            {/* Background Pattern */}
            <div className={styles.backgroundPattern} />

            {/* Map Image Container */}
            <div className={styles.imageContainer}>
              <Image 
                src="/assets/logo-peta.png" 
                alt="Peta Dusun Kalibulus"
                width={400}
                height={400}
                className={styles.mapImage}
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
                sizes="(max-width: 768px) 300px, 400px"
              />
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorativeTop}>
              🗺️
            </div>

            <div className={styles.decorativeBottom} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetaDusun;