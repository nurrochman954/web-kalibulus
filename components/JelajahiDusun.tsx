import React from 'react';

const ExploreCard = ({ title, icon, link }: {
  title: string;
  icon: string;
  link: string;
}) => {
  return (
    <a 
      href={link} 
      className="group block w-full"
    >
      <div className="
        flex flex-col items-center justify-center bg-white rounded-xl p-6 min-h-[180px] 
        border border-gray-200 shadow-md transition-all duration-300 ease-out
        hover:shadow-xl hover:border-cyan-300 hover:-translate-y-1 
        relative overflow-hidden
        lg:min-h-[200px] lg:rounded-2xl
      ">
        
        {/* Icon Container */}
        <div className="
          bg-cyan-50 rounded-xl p-5 mb-4 relative z-10
          w-16 h-16 flex items-center justify-center
          transition-all duration-300 ease-out
          group-hover:bg-cyan-100 group-hover:scale-105
          lg:w-20 lg:h-20 lg:p-6
        ">
          <div className="
            text-3xl transition-all duration-300 
            group-hover:scale-110
            lg:text-4xl
          ">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="
          text-gray-700 font-semibold text-sm leading-tight text-center
          uppercase tracking-wide relative z-10 transition-colors duration-300
          group-hover:text-gray-900
          lg:text-base
        ">
          {title}
        </h3>
      </div>
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
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
      {/* Reduced Spacer */}
      <div className="h-8" />
      
      <section 
        id="explore" 
        className="py-8 lg:py-12 px-4 lg:px-8 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center gap-20">
            {/* Text Content - Left */}
            <div className={`
              flex-1 max-w-lg
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}>
              <h2 className="
                text-cyan-600 font-bold text-5xl xl:text-6xl leading-tight mb-8
              ">
                {title}
              </h2>
              <p className="
                text-gray-600 text-xl leading-relaxed
              ">
                {description}
              </p>
            </div>
            
            {/* Cards - Right (Zigzag Layout) */}
            <div className="flex-1 relative h-[450px] max-w-lg">
              {/* Card 1 - Top Left */}
              <div 
                className={`
                  absolute top-0 left-0 w-52
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '200ms' }}
              >
                <ExploreCard {...cards[0]} />
              </div>
              
              {/* Card 2 - Top Right */}
              <div 
                className={`
                  absolute top-0 right-0 w-52
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '350ms' }}
              >
                <ExploreCard {...cards[1]} />
              </div>
              
              {/* Card 3 - Bottom Left */}
              <div 
                className={`
                  absolute bottom-0 left-16 w-52
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '500ms' }}
              >
                <ExploreCard {...cards[2]} />
              </div>
              
              {/* Card 4 - Bottom Right */}
              <div 
                className={`
                  absolute bottom-0 -right-16 w-52
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '650ms' }}
              >
                <ExploreCard {...cards[3]} />
              </div>
            </div>
          </div>
          
          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden">
            {/* Text Content */}
            <div className={`
              mb-8 text-center
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <h2 className="
                text-cyan-600 font-bold text-3xl sm:text-4xl leading-tight mb-6
              ">
                {title}
              </h2>
              <p className="
                text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto
              ">
                {description}
              </p>
            </div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`
                    transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{
                    transitionDelay: `${300 + (index * 100)}ms`
                  }}
                >
                  <ExploreCard {...card} />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default JelajahiDusun;