'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, whatsappLink } from '@/config/site';
import { servicePages } from '@/data/servicePages';
import styles from './Footer.module.css';

// Absolute "/#…" links so the footer also works on the about, blog and legal pages
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Prices', href: '/#service-catalog' },
  { label: 'How It Works', href: '/#process' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const services = servicePages.map((page) => ({
  label: page.shortName,
  href: `/services/${page.slug}`,
}));

function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/teamdeepdivers@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="Newsletter Subscription - DeepDivers" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className={styles.newsletterInput}
        required
        disabled={status === 'loading' || status === 'success'}
      />
      <button 
        type="submit" 
        className={styles.newsletterBtn}
        disabled={status === 'loading' || status === 'success'}
      >
        {status === 'loading' ? '...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <span className={styles.newsletterError}>Failed. Try again.</span>
      )}
    </form>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <h3>
              <Image
                src="/logo.png"
                alt="DeepDivers"
                width={40}
                height={40}
                className={styles.footerLogo}
              />
              DeepDivers
            </h3>
            <p>
              Research support from published researchers: statistics, editing, formatting,
              systematic reviews and machine learning. You stay the author.
            </p>
            <div className={styles.footerSocials}>
              <a
                href="https://github.com/03-134202-096"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className={styles.footerSocialLink}
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footerNewsletter}>
            <h4>Stay Updated</h4>
            <p>Subscribe to receive updates on new services and research insights.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            © {currentYear} DeepDivers. All rights reserved. | Professional Research & Data Science Services
          </p>
          <div className={styles.footerAddress}>
            <span>📍 Office: {SITE.address.display}</span>
          </div>
          <div className={styles.footerLegal}>
            <Link href="/about">About Us</Link>
            <span className={styles.footerLegalSep}>•</span>
            <Link href="/terms">Terms & Conditions</Link>
            <span className={styles.footerLegalSep}>•</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.footerLegalSep}>•</span>
            <Link href="/terms#refund">Refund & Revision Policy</Link>
            <span className={styles.footerLegalSep}>•</span>
            <span>Secure Payments via Payoneer • Visa • Mastercard • Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
