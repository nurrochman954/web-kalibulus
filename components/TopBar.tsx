"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 40;
      setIsSticky(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries: any) => {
      entries.forEach((entry: any) => {
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleMenu && isMobile) {
        const target = event.target as Element;
        if (!target.closest('[data-mobile-menu]')) {
          setToggleMenu(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [toggleMenu, isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (toggleMenu && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [toggleMenu, isMobile]);

  return (
    <>
      {/* Main TopBar */}
      <div
        data-mobile-menu
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: isSticky ? '0px' : '40px',
          zIndex: 50,
          backgroundColor: hoveringMenu ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s ease',
          padding: '8px 0',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Mobile Menu Button */}
        <div
          style={{
            display: isMobile ? 'flex' : 'none',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px'
          }}
        >
          <div style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            Dusun Kalibulus
          </div>
          
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              transform: toggleMenu ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 246.42 246.04"
              style={{ fill: 'white' }}
            >
              <rect x="0.79" y="30.22" width="245.63" height="23.36" rx="11.68" />
              <rect x="0.39" y="111.32" width="245.63" height="23.36" rx="11.68" />
              <rect y="192.42" width="245.63" height="23.36" rx="11.68" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div
          style={{
            display: !isMobile ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexDirection: 'row'
          }}
        >
          {menus.map((menu, i) => (
            <Link 
              key={i} 
              href={menu.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                onMouseEnter={() => setHoveringMenu(menu.name)}
                onMouseLeave={() => setHoveringMenu(null)}
                style={{
                  textTransform: 'capitalize',
                  fontSize: '16px',
                  fontWeight: activeSection === menu.name ? '600' : (hoveringMenu === menu.name ? 'bold' : '500'),
                  textAlign: 'center',
                  padding: '8px 24px',
                  borderRadius: '16px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  textDecoration: hoveringMenu === menu.name ? 'underline' : 'none',
                  backgroundColor: activeSection === menu.name ? '#1f2937' : 'transparent',
                  color: activeSection === menu.name 
                    ? 'white' 
                    : hoveringMenu === menu.name 
                      ? 'black' 
                      : hoveringMenu 
                        ? 'black' 
                        : 'white',
                  boxShadow: activeSection === menu.name ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                {menu.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {toggleMenu && isMobile && (
        <div
          data-mobile-menu
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          {/* Mobile Menu Panel */}
          <div
            style={{
              width: '80%',
              maxWidth: '320px',
              height: '100vh',
              backgroundColor: 'white',
              boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
              transform: toggleMenu ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflowY: 'auto',
              paddingTop: '80px'
            }}
          >
            {/* Menu Header */}
            <div style={{
              padding: '24px 24px 16px 24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                color: '#1f2937',
                fontSize: '18px',
                fontWeight: 'bold',
                margin: 0
              }}>
                Menu Navigasi
              </h3>
              
              {/* Close Button */}
              <button
                onClick={() => setToggleMenu(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  width: '32px',
                  height: '32px'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            {menus.map((menu, i) => (
              <Link 
                key={i} 
                href={menu.href}
                style={{ textDecoration: 'none' }}
              >
                <div
                  onClick={() => setToggleMenu(false)}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    if (activeSection !== menu.name) {
                      target.style.backgroundColor = '#f3f4f6';
                      target.style.color = '#1f2937';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    if (activeSection !== menu.name) {
                      target.style.backgroundColor = 'transparent';
                      target.style.color = '#374151';
                    }
                  }}
                  style={{
                    textTransform: 'capitalize',
                    fontSize: '16px',
                    fontWeight: activeSection === menu.name ? '600' : '500',
                    padding: '16px 24px',
                    cursor: 'pointer',
                    borderBottom: i < menus.length - 1 ? '1px solid #f3f4f6' : 'none',
                    backgroundColor: activeSection === menu.name ? '#1f2937' : 'transparent',
                    color: activeSection === menu.name ? 'white' : '#374151',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  {/* Menu Icon */}
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: activeSection === menu.name ? 'white' : '#6b7280',
                    transition: 'all 0.2s ease'
                  }} />
                  
                  {menu.name}
                  
                  {/* Arrow for active menu */}
                  {activeSection === menu.name && (
                    <div style={{
                      marginLeft: 'auto',
                      color: 'white',
                      fontSize: '14px'
                    }}>
                      →
                    </div>
                  )}
                </div>
              </Link>
            ))}

            {/* Menu Footer */}
            <div style={{
              padding: '24px',
              marginTop: '32px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#f8fafc'
            }}>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0,
                textAlign: 'center'
              }}>
                Dusun Kalibulus<br />
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