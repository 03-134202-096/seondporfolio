'use client';

import { useState, useEffect } from 'react';
import { PROMO_CONFIG, isPromoActive, getPromoTimeRemaining } from '@/config/promo';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsActive(isPromoActive());
    setTimeLeft(getPromoTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const active = isPromoActive();
      setIsActive(active);
      if (active) {
        setTimeLeft(getPromoTimeRemaining());
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isActive || dismissed || !timeLeft) return null;

  const message = PROMO_CONFIG.PROMO_MESSAGE.replace(
    '{discount}',
    String(PROMO_CONFIG.DISCOUNT_PERCENT)
  );

  return (
    <div className={styles.banner}>
      <div className={styles.bannerInner}>
        <div className={styles.bannerContent}>
          <span className={styles.promoLabel}>{PROMO_CONFIG.PROMO_LABEL}</span>
          <span className={styles.promoMessage}>{message}</span>
        </div>
        <div className={styles.countdown}>
          <div className={styles.timeBlock}>
            <span className={styles.timeValue}>{String(timeLeft.days).padStart(2, '0')}</span>
            <span className={styles.timeUnit}>Days</span>
          </div>
          <span className={styles.timeSep}>:</span>
          <div className={styles.timeBlock}>
            <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className={styles.timeUnit}>Hrs</span>
          </div>
          <span className={styles.timeSep}>:</span>
          <div className={styles.timeBlock}>
            <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className={styles.timeUnit}>Min</span>
          </div>
          <span className={styles.timeSep}>:</span>
          <div className={styles.timeBlock}>
            <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className={styles.timeUnit}>Sec</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.dismissBtn}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss promo banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
