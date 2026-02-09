'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import styles from './CollapsibleSection.module.css';

interface CollapsibleSectionProps {
  /** The section ID (used for hash navigation) */
  sectionId: string;
  /** Section title displayed in the toggle header */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Badge text (e.g. "5 Papers", "3 Reviews") */
  badge?: string;
  /** Whether the section starts expanded */
  defaultExpanded?: boolean;
  /** Children content to render inside the collapsible area */
  children: ReactNode;
}

export default function CollapsibleSection({
  sectionId,
  title,
  subtitle,
  badge,
  defaultExpanded = false,
  children,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-expand when hash matches this section
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === sectionId) {
        setIsExpanded(true);
        // Scroll into view after a brief delay for animation
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };

    // Check on mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    // Also listen for custom event (for programmatic navigation from nav/footer)
    const handleExpand = () => {
      setIsExpanded(true);
      // Use requestAnimationFrame to ensure DOM is updated before scroll
      requestAnimationFrame(() => {
        setTimeout(() => {
          const headerHeight = 80;
          const el = sectionRef.current;
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 50);
      });
    };
    window.addEventListener(`expand-${sectionId}`, handleExpand);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener(`expand-${sectionId}`, handleExpand);
    };
  }, [sectionId]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id={sectionId} ref={sectionRef} className={styles.collapsible}>
      <div className={styles.container}>
        <button
          className={styles.toggleHeader}
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls={`${sectionId}-content`}
        >
          <div className={styles.headerContent}>
            <h2 className={styles.headerTitle}>{title}</h2>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
          </div>
          <div className={styles.headerActions}>
            {badge && <span className={styles.headerBadge}>{badge}</span>}
            <span className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ''}`}>
              ▾
            </span>
          </div>
        </button>
        <div
          id={`${sectionId}-content`}
          className={`${styles.contentWrapper} ${isExpanded ? styles.contentExpanded : ''}`}
          ref={contentRef}
          role="region"
          aria-labelledby={sectionId}
        >
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
