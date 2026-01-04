'use client';

import { useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without triggering default scroll
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
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

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="#contact" 
            className={`btn btn-primary ${styles.ctaButton}`} 
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
