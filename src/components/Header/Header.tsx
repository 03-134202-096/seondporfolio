'use client';

import { useState, useEffect, MouseEvent, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Catalog', href: '#service-catalog' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '/about', external: true },
  { label: 'Blog', href: '/blog', external: true },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(`.${styles.mobileMenuBtn}`)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as never);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as never);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');

    // Dispatch expand event for collapsible sections
    window.dispatchEvent(new CustomEvent(`expand-${targetId}`));

    // Small delay to allow section to expand before scrolling
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }, 150);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    
    if (!isHome) return; // Let Link handle navigation to "/"

    e.preventDefault();
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      const headerHeight = 80;
      const targetPosition = heroElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', '#hero');
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.headerInner}>
        <Link href={isHome ? '#hero' : '/'} className={styles.logo} onClick={handleLogoClick}>
          <Image
            src="/logo.png"
            alt="DeepDivers Logo"
            width={40}
            height={40}
            className={styles.logoIcon}
          />
          <span>DeepDivers</span>
        </Link>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav ref={navRef} className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isHashLink = item.href.startsWith('#');
              const isExternal = 'external' in item && item.external;

              // On non-home pages, hash links should navigate to homepage first
              if (!isHome && isHashLink) {
                return (
                  <li key={item.href}>
                    <Link
                      href={`/${item.href}`}
                      className={styles.navLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  {isExternal ? (
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link 
            href={isHome ? '#contact' : '/#contact'} 
            className={`btn btn-primary ${styles.ctaButton}`} 
            onClick={isHome ? (e) => handleNavClick(e, '#contact') : () => setIsMobileMenuOpen(false)}
          >
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
