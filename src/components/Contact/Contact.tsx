'use client';

import { useState, useEffect } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    // Set redirect URL based on current origin
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/?submitted=true#contact`);
      
      // Check if redirected back after form submission
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('submitted') === 'true') {
        setShowSuccess(true);
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname + '#contact');
        // Hide success message after 10 seconds
        setTimeout(() => setShowSuccess(false), 10000);
      }
    }
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>
            Ready to elevate your research or project? Reach out and let&apos;s discuss how
            we can help you achieve your goals.
          </p>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h3>Let&apos;s Work Together</h3>
            <p>
              Whether you have a specific project in mind or need guidance on the best
              approach, we&apos;re here to help. Our team is available 24/7 and responds promptly.
            </p>
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>📧</div>
                <div className={styles.contactMethodText}>
                  <h4>Email Us</h4>
                  <p>
                    <a href="mailto:teamdeepdivers@gmail.com">teamdeepdivers@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>💬</div>
                <div className={styles.contactMethodText}>
                  <h4>WhatsApp</h4>
                  <p>
                    <a
                      href="https://wa.me/923125065538"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +92 312 5065538
                    </a>
                  </p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>🌍</div>
                <div className={styles.contactMethodText}>
                  <h4>Location</h4>
                  <p>Pakistan • Available Worldwide</p>
                </div>
              </div>
            </div>
            <div className={styles.platforms}>
              <h4>Find Us On</h4>
              <div className={styles.platformsList}>
                <a
                  href="https://github.com/03-134202-096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.platformBadge}
                >
                  🐙 GitHub
                </a>
                <span className={styles.platformBadge}>🟢 Fiverr</span>
                <span className={styles.platformBadge}>🟢 Upwork</span>
                <span className={styles.platformBadge}>🔵 Freelancer</span>
              </div>
            </div>
          </div>
          {/* Standard form submission - supports file uploads */}
          <form 
            className={styles.contactForm} 
            action="https://formsubmit.co/teamdeepdivers@gmail.com"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New Quote Request - DeepDivers Portfolio" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            {redirectUrl && <input type="hidden" name="_next" value={redirectUrl} />}
            
            <h3>Request a Quote</h3>
            <p>Fill out the form and we&apos;ll respond shortly.</p>
            
            {showSuccess && (
              <div className={styles.formSuccess}>
                ✅ Thank you! Your request has been received. We&apos;ll get back to you shortly.
              </div>
            )}
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="service" className={styles.formLabel}>
                  Service Category
                </label>
                <select
                  id="service"
                  name="service"
                  className={styles.formSelect}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Academic & Research">Academic & Research Services</option>
                  <option value="Data & AI">Data, AI & Technical Services</option>
                  <option value="Writing & Content">Writing, Content & Admin</option>
                  <option value="Custom">Custom Project</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="budget" className={styles.formLabel}>
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={styles.formSelect}
                >
                  <option value="">Select budget</option>
                  <option value="$50 - $100">$50 - $100</option>
                  <option value="$100 - $300">$100 - $300</option>
                  <option value="$300 - $500">$300 - $500</option>
                  <option value="$500 - $1000">$500 - $1000</option>
                  <option value="$1000+">$1000+</option>
                  <option value="Custom / Negotiable">Custom / Negotiable</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.formTextarea}
                placeholder="Describe your project requirements, timeline, and any specific needs. For files larger than 5MB, please share via Google Drive or Dropbox link."
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="attachment" className={styles.formLabel}>
                Attachments <span className={styles.formLabelOptional}>(Optional - Max 5MB)</span>
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                className={styles.formFileInput}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip,.rar"
              />
              <p className={styles.formFileHint}>
                For larger files, include a Google Drive or Dropbox link in the message above.
              </p>
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.formSubmit}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p className={styles.formNote}>
              🚀 We&apos;re available 24/7 and will respond as soon as possible.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
