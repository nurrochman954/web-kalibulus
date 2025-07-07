import React from 'react';
import Image from 'next/image';

const PetaDusun = () => {
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
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
      className="py-8 lg:py-12 px-4 lg:px-8 bg-white relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className={`
          text-cyan-600 font-bold text-4xl lg:text-5xl xl:text-6xl 
          leading-tight mb-8 lg:mb-12 text-center lg:text-left
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          Peta Dusun
        </h2>
        
        {/* Map Container */}
        <div className={`
          flex justify-center
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{ transitionDelay: '200ms' }}>
          <div className="group w-full max-w-4xl">
            <div className="
              relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 
              shadow-xl border border-gray-200 overflow-hidden cursor-pointer
              transition-all duration-500 ease-out
              hover:shadow-2xl hover:border-cyan-300 hover:-translate-y-2
            ">

              {/* Map Image Container */}
              <div className="
                relative z-10 flex justify-center items-center
                bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-100
                transition-all duration-300 group-hover:bg-gray-100
              ">
                <Image 
                  src="/assets/logo-peta.png" 
                  alt="Peta Dusun Kalibulus"
                  width={600}
                  height={450}
                  className="
                    w-full h-auto rounded-lg object-contain
                    shadow-md transition-all duration-300
                    group-hover:shadow-lg
                    max-h-72 sm:max-h-80 lg:max-h-96
                  "
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
                  sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 600px"
                />
              </div>

              {/* Decorative Elements */}
              <div className="
                absolute top-4 right-4 lg:top-6 lg:right-6 
                w-10 h-10 lg:w-12 lg:h-12
                bg-cyan-100 rounded-full flex items-center justify-center
                opacity-70 transition-all duration-300 ease-out
                group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12
              ">
                <span className="text-lg lg:text-xl">🗺️</span>
              </div>

              <div className="
                absolute bottom-4 left-4 lg:bottom-6 lg:left-6 
                w-6 h-6 lg:w-8 lg:h-8
                bg-cyan-500 rounded-full opacity-50
                transition-all duration-300 ease-out
                group-hover:opacity-80 group-hover:scale-125
              " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetaDusun;