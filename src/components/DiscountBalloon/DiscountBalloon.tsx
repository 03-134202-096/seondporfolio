'use client';

import { useState, useEffect } from 'react';
import { PROMO_CONFIG, isPromoActive } from '@/config/promo';
import styles from './DiscountBalloon.module.css';

const DISMISS_KEY = 'dd-discount-balloon-dismissed';

export default function DiscountBalloon() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    if (!wasDismissed && isPromoActive()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  const handleClick = () => {
    const el = document.getElementById('service-catalog');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles.balloon}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${PROMO_CONFIG.DISCOUNT_PERCENT}% discount — click to browse services`}
    >
      <button
        type="button"
        className={styles.dismiss}
        onClick={handleDismiss}
        aria-label="Dismiss discount badge"
      >
        ✕
      </button>
      <span className={styles.value}>{PROMO_CONFIG.DISCOUNT_PERCENT}%</span>
      <span className={styles.label}>OFF</span>
      <span className={styles.sub}>{PROMO_CONFIG.PROMO_LABEL}</span>
    </div>
  );
}
