'use client';

import { useState, useRef, FormEvent } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        form.reset();
        // Scroll to success message
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                  <p className={styles.contactWithCopy}>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=teamdeepdivers@gmail.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      teamdeepdivers@gmail.com
                    </a>
                    <button 
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('teamdeepdivers@gmail.com', 'email')}
                      title="Copy email"
                    >
                      {copiedField === 'email' ? '✓' : '📋'}
                    </button>
                  </p>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>💬</div>
                <div className={styles.contactMethodText}>
                  <h4>WhatsApp</h4>
                  <p className={styles.contactWithCopy}>
                    <a
                      href="https://wa.me/923125065538"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +92 312 5065538
                    </a>
                    <button 
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('+923125065538', 'phone')}
                      title="Copy number"
                    >
                      {copiedField === 'phone' ? '✓' : '📋'}
                    </button>
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
          {/* Professional API-based form submission */}
          <form 
            ref={formRef}
            className={styles.contactForm} 
            onSubmit={handleSubmit}
          >
            <h3>Request a Quote</h3>
            <p>Fill out the form and we&apos;ll respond shortly.</p>
            
            {submitStatus === 'success' && (
              <div className={styles.formSuccess}>
                <span className={styles.successIcon}>✅</span>
                <div>
                  <strong>Message Sent Successfully!</strong>
                  <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className={styles.formError}>
                <span className={styles.errorIcon}>❌</span>
                <div>
                  <strong>Failed to Send</strong>
                  <p>{errorMessage}</p>
                  <p className={styles.errorHint}>
                    You can also reach us via{' '}
                    <a href="https://wa.me/923125065538" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>{' '}
                    or{' '}
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=teamdeepdivers@gmail.com" target="_blank" rel="noopener noreferrer">
                      Gmail
                    </a>
                  </p>
                </div>
              </div>
            )}
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Your Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="service" className={styles.formLabel}>
                  Service Category <span className={styles.required}>*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  className={styles.formSelect}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a service</option>
                  <option value="Academic & Research Services">Academic & Research Services</option>
                  <option value="Data, AI & Technical Services">Data, AI & Technical Services</option>
                  <option value="Writing, Content & Admin">Writing, Content & Admin</option>
                  <option value="Custom Project">Custom Project</option>
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
                  disabled={isSubmitting}
                >
                  <option value="">Select budget</option>
                  <option value="$25 - $50">$25 - $50</option>
                  <option value="$50 - $100">$50 - $100</option>
                  <option value="$100 - $200">$100 - $200</option>
                  <option value="$200 - $500">$200 - $500</option>
                  <option value="$500+">$500+</option>
                  <option value="Custom / Negotiable">Custom / Negotiable</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Project Details <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.formTextarea}
                placeholder="Describe your project requirements, timeline, and any specific needs..."
                required
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="attachment" className={styles.formLabel}>
                Attachment <span className={styles.formLabelOptional}>(Optional - Max 4MB)</span>
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                className={styles.formFileInput}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip,.rar,.xlsx,.pptx"
                disabled={isSubmitting}
              />
              <p className={styles.formFileHint}>
                📁 For files larger than 4MB, please share via <strong>Google Drive</strong> or <strong>Dropbox</strong> link in your message.
              </p>
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.formSubmit}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
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
