"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menus = [
  { name: "beranda", href: "/" },
  { name: "profil dusun", href: "/profil-dusun" },
  { name: "infografis", href: "/infografis" },
  { name: "edukasi masyarakat", href: "/edukasi-masyarakat" },
  { name: "berita", href: "/berita" },
];

const TopBar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [hoveringMenu, setHoveringMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 40;
      setIsSticky(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    menus.forEach((menu) => {
      const element = document.getElementById(menu.name);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [toggleMenu]);

  return (
    <>
      {/* Main TopBar */}
      <nav
        className={`
          fixed left-0 right-0 z-50 py-2 backdrop-blur-lg
          transition-all duration-300 ease-out
          ${isSticky ? 'top-0' : 'top-10'}
          ${hoveringMenu ? 'bg-white shadow-lg' : 'bg-black/25'}
        `}
      >
        {/* Mobile Menu Button */}
        <div className="flex sm:hidden justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-kab-sleman.png"
              alt="Logo Kabupaten Sleman"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div className="text-white font-bold text-lg">
              Dusun Kalibulus
            </div>
          </div>
          
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="p-2 transition-transform duration-200 hover:bg-white/10 rounded-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`fill-white transition-transform duration-200 ${toggleMenu ? 'rotate-90' : ''}`}
            >
              <rect x="3" y="6" width="18" height="2" rx="1" />
              <rect x="3" y="11" width="18" height="2" rx="1" />
              <rect x="3" y="16" width="18" height="2" rx="1" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex justify-center items-center gap-10">
          {menus.map((menu, i) => (
            <Link 
              key={i} 
              href={menu.href}
              className="group"
            >
              <div
                onMouseEnter={() => setHoveringMenu(menu.name)}
                onMouseLeave={() => setHoveringMenu(null)}
                className={`
                  capitalize text-base font-medium text-center px-6 py-2 rounded-2xl 
                  transition-all duration-200 cursor-pointer uppercase tracking-wide
                  ${activeSection === menu.name 
                    ? 'bg-dusun-800 text-white shadow-lg font-semibold' 
                    : hoveringMenu === menu.name 
                      ? 'bg-white text-dusun-800 font-bold underline' 
                      : hoveringMenu 
                        ? 'text-dusun-800' 
                        : 'text-white hover:text-dusun-800 hover:bg-white'
                  }
                `}
              >
                {menu.name}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {toggleMenu && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 animate-fade-in" 
            onClick={() => setToggleMenu(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute left-0 top-0 w-4/5 max-w-80 h-full bg-white shadow-2xl animate-slide-in-left">
            {/* Menu Header */}
            <div className="flex justify-between items-center px-6 py-6 pt-20 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logo-kab-sleman.png"
                  alt="Logo Kabupaten Sleman"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <h3 className="text-dusun-800 text-lg font-bold">
                  Dusun Kalibulus
                </h3>
              </div>
              
              <button
                onClick={() => setToggleMenu(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dusun-700"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {menus.map((menu, i) => (
                <Link 
                  key={i} 
                  href={menu.href}
                  onClick={() => setToggleMenu(false)}
                  className={`
                    flex items-center gap-3 px-6 py-4 capitalize font-medium
                    transition-colors duration-200 
                    ${i < menus.length - 1 ? 'border-b border-gray-100' : ''}
                    ${activeSection === menu.name 
                      ? 'bg-dusun-800 text-white font-semibold' 
                      : 'text-dusun-600 hover:bg-dusun-50 hover:text-dusun-800'
                    }
                  `}
                >
                  <div className={`
                    w-2 h-2 rounded-full transition-colors duration-200
                    ${activeSection === menu.name ? 'bg-white' : 'bg-dusun-400'}
                  `} />
                  
                  <span className="flex-1">{menu.name}</span>
                  
                  {activeSection === menu.name && (
                    <span className="text-white text-sm">→</span>
                  )}
                </Link>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-gray-200 bg-dusun-50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Image
                  src="/assets/logo-kab-sleman.png"
                  alt="Logo Kabupaten Sleman"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <p className="text-dusun-700 text-sm font-medium">
                  Dusun Kalibulus
                </p>
              </div>
              <p className="text-dusun-500 text-xs text-center">
                Kalurahan Bimomartani
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;