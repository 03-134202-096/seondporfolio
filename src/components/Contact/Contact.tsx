'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import styles from './Contact.module.css';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const MAX_FILE_SIZE_DISPLAY = '4MB';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    setSelectedFileName(null);
    
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        const fileSize = formatFileSize(file.size);
        setFileError(`File size (${fileSize}) exceeds ${MAX_FILE_SIZE_DISPLAY} limit. Please use Google Drive or Dropbox link instead.`);
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSelectedFileName(`${file.name} (${formatFileSize(file.size)})`);
      }
    }
  };

  const clearFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFileName(null);
    setFileError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent submission if there's a file error
    if (fileError) {
      return;
    }
    
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
        setSelectedFileName(null);
        setFileError(null);
        // Scroll to success message
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setSubmitStatus('error');
        // Show specific error message from server
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form can be submitted
  const canSubmit = !isSubmitting && !fileError;

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
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=support@deepdivers.services" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      support@deepdivers.services
                    </a>
                    <button 
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('support@deepdivers.services', 'email')}
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
                  🔵 GitHub
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
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@deepdivers.services" target="_blank" rel="noopener noreferrer">
                      Email
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
              <div className={styles.fileInputWrapper}>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="attachment"
                  name="attachment"
                  className={`${styles.formFileInput} ${fileError ? styles.fileInputError : ''}`}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip,.rar,.xlsx,.pptx"
                  disabled={isSubmitting}
                  onChange={handleFileChange}
                />
                {selectedFileName && (
                  <div className={styles.selectedFile}>
                    <span className={styles.selectedFileIcon}>📎</span>
                    <span className={styles.selectedFileName}>{selectedFileName}</span>
                    <button 
                      type="button" 
                      className={styles.clearFileBtn}
                      onClick={clearFileSelection}
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              {fileError && (
                <div className={styles.fileErrorMessage}>
                  <span className={styles.fileErrorIcon}>⚠️</span>
                  <span>{fileError}</span>
                </div>
              )}
              <p className={styles.formFileHint}>
                📁 For files larger than 4MB, please share via <strong>Google Drive</strong> or <strong>Dropbox</strong> link in your message.
              </p>
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.formSubmit} ${!canSubmit ? styles.formSubmitDisabled : ''}`}
              disabled={!canSubmit}
              title={fileError ? 'Please fix file size issue before sending' : 'Send your message'}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : fileError ? (
                <>
                  <span className={styles.warningIcon}>⚠️</span>
                  Fix File Size Issue
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
