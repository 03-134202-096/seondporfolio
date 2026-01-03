'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './SuccessToast.module.css';

export default function SuccessToast() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('submitted') === 'true') {
      setShow(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => setShow(false), 8000);
      // Clean URL
      window.history.replaceState({}, '', '/');
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>✅</span>
        <div className={styles.toastText}>
          <strong>Message Sent Successfully!</strong>
          <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
        </div>
        <button 
          className={styles.toastClose} 
          onClick={() => setShow(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
