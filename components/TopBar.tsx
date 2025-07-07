"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from './TopBar.module.css';

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleMenu) {
        const target = event.target as Element;
        if (!target.closest('[data-mobile-menu]')) {
          setToggleMenu(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [toggleMenu]);

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
      <div
        data-mobile-menu
        className={`${styles.topBar} ${isSticky ? styles.topBarSticky : styles.topBarNormal} ${hoveringMenu ? styles.topBarHovered : styles.topBarDefault}`}
      >
        {/* Mobile Menu Button */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileBrand}>
            Dusun Kalibulus
          </div>
          
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className={`${styles.hamburgerButton} ${toggleMenu ? styles.hamburgerRotated : ''}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 246.42 246.04"
              className={styles.hamburgerIcon}
            >
              <rect x="0.79" y="30.22" width="245.63" height="23.36" rx="11.68" />
              <rect x="0.39" y="111.32" width="245.63" height="23.36" rx="11.68" />
              <rect y="192.42" width="245.63" height="23.36" rx="11.68" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {menus.map((menu, i) => (
            <Link 
              key={i} 
              href={menu.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                onMouseEnter={() => setHoveringMenu(menu.name)}
                onMouseLeave={() => setHoveringMenu(null)}
                className={`${styles.menuItem} ${
                  activeSection === menu.name 
                    ? styles.menuItemActive 
                    : hoveringMenu === menu.name 
                      ? styles.menuItemHovered 
                      : hoveringMenu 
                        ? styles.menuItemHoveredContext 
                        : styles.menuItemDefault
                }`}
              >
                {menu.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {toggleMenu && (
        <div
          data-mobile-menu
          className={styles.mobileOverlay}
        >
          {/* Mobile Menu Panel */}
          <div className={`${styles.mobilePanel} ${toggleMenu ? styles.mobilePanelVisible : styles.mobilePanelHidden}`}>
            {/* Menu Header */}
            <div className={styles.mobileMenuHeader}>
              <h3 className={styles.mobileMenuTitle}>
                Menu Navigasi
              </h3>
              
              {/* Close Button */}
              <button
                onClick={() => setToggleMenu(false)}
                className={styles.closeButton}
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
                className={`${styles.mobileMenuItem} ${
                  activeSection === menu.name 
                    ? styles.mobileMenuItemActive 
                    : styles.mobileMenuItemDefault
                } ${i < menus.length - 1 ? styles.mobileMenuItemBorder : ''}`}
                onClick={() => setToggleMenu(false)}
              >
                {/* Menu Icon */}
                <div className={`${styles.menuIcon} ${
                  activeSection === menu.name 
                    ? styles.menuIconActive 
                    : styles.menuIconDefault
                }`} />
                
                {menu.name}
                
                {/* Arrow for active menu */}
                {activeSection === menu.name && (
                  <div className={styles.menuArrow}>
                    →
                  </div>
                )}
              </Link>
            ))}

            {/* Menu Footer */}
            <div className={styles.mobileMenuFooter}>
              <p className={styles.mobileMenuFooterText}>
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