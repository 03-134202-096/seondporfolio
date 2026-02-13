'use client';

import { useState, useEffect } from 'react';
import styles from './ServiceCatalog.module.css';
import { isPromoActive, getDiscountedPrice, PROMO_CONFIG } from '@/config/promo';

type ServiceCategory =
  | 'all'
  | 'academic'
  | 'data-ai'
  | 'writing'
  | 'development'
  | 'tools';

interface ServiceItem {
  name: string;
  category: ServiceCategory;
  price: string;
  delivery: string;
  popular?: boolean;
}

const services: ServiceItem[] = [
  // Academic & Research Services
  { name: 'Journal-Style Formatting', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Copyediting', category: 'academic', price: 'From $30', delivery: '1–3 days' },
  { name: 'Proofreading', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Fact-Checking', category: 'academic', price: 'From $30', delivery: '2–3 days' },
  { name: 'Citation Formatting (APA/MLA/Chicago/Vancouver)', category: 'academic', price: 'From $25', delivery: '1–2 days', popular: true },
  { name: 'Plagiarism Screening & Report', category: 'academic', price: 'From $20', delivery: '1 day' },
  { name: 'English-Language Editing', category: 'academic', price: 'From $35', delivery: '2–3 days' },
  { name: 'Literature Search', category: 'academic', price: 'From $50', delivery: '3–5 days', popular: true },
  { name: 'Systematic Review Support', category: 'academic', price: 'From $150', delivery: '7–14 days' },
  { name: 'Annotated Bibliography', category: 'academic', price: 'From $40', delivery: '2–4 days' },
  { name: 'Article Summarization', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Research Gap Analysis', category: 'academic', price: 'From $60', delivery: '3–5 days' },
  { name: 'Grant Proposal Writing', category: 'academic', price: 'From $200', delivery: '7–14 days' },
  { name: 'Grant Proposal Editing', category: 'academic', price: 'From $80', delivery: '3–5 days' },
  { name: 'CV Editing for Researchers', category: 'academic', price: 'From $35', delivery: '1–2 days' },
  { name: 'Cover Letter Writing', category: 'academic', price: 'From $30', delivery: '1–2 days' },
  { name: 'Statement of Purpose Editing', category: 'academic', price: 'From $35', delivery: '1–2 days' },
  { name: 'Research Plan Writing', category: 'academic', price: 'From $100', delivery: '5–7 days' },
  { name: 'Journal Selection Research', category: 'academic', price: 'From $30', delivery: '1–2 days' },
  { name: 'Reviewer Response Assistance', category: 'academic', price: 'From $60', delivery: '3–5 days' },
  { name: 'Abstract Writing', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Keyword Selection & SEO', category: 'academic', price: 'From $20', delivery: '1 day' },
  { name: 'Student Application Assistance', category: 'academic', price: 'From $50', delivery: '2–4 days' },
  { name: 'Reference Cross-Checking', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Humanizing AI Text', category: 'academic', price: 'From $25', delivery: '1–2 days', popular: true },
  { name: 'Paraphrasing & Rewriting', category: 'academic', price: 'From $30', delivery: '1–3 days' },
  { name: 'End-to-End Q1 Paper Publication Support', category: 'academic', price: 'From $350', delivery: '14–30 days', popular: true },

  // Data, AI & Technical Services
  { name: 'Data Collection (Surveys/APIs/Public Sources)', category: 'data-ai', price: 'From $40', delivery: '2–5 days' },
  { name: 'Survey Design & Development', category: 'data-ai', price: 'From $50', delivery: '2–4 days' },
  { name: 'Data Entry', category: 'data-ai', price: 'From $25', delivery: '1–3 days' },
  { name: 'Data Cleaning & Preprocessing', category: 'data-ai', price: 'From $40', delivery: '2–4 days', popular: true },
  { name: 'Data Annotation for ML/AI', category: 'data-ai', price: 'From $50', delivery: '3–7 days' },
  { name: 'Chart & Graph Creation (Python)', category: 'data-ai', price: 'From $30', delivery: '1–2 days' },
  { name: 'Infographic Design', category: 'data-ai', price: 'From $40', delivery: '2–3 days' },
  { name: 'Diagram & Flowchart Creation', category: 'data-ai', price: 'From $30', delivery: '1–2 days' },
  { name: 'Table Formatting (Journal Specs)', category: 'data-ai', price: 'From $20', delivery: '1 day' },
  { name: 'Visualization Coding (Python Scripts)', category: 'data-ai', price: 'From $50', delivery: '2–4 days' },
  { name: 'ML/AI/DL Model Training', category: 'data-ai', price: 'From $150', delivery: '5–14 days', popular: true },
  { name: 'Hyperparameter Tuning', category: 'data-ai', price: 'From $80', delivery: '3–7 days' },
  { name: 'Experiment Execution & Logging', category: 'data-ai', price: 'From $100', delivery: '3–7 days' },
  { name: 'Benchmarking & Model Comparison', category: 'data-ai', price: 'From $80', delivery: '3–5 days' },
  { name: 'Web Scraping & Data Extraction', category: 'data-ai', price: 'From $50', delivery: '2–5 days', popular: true },
  { name: 'Dataset Curation & Preprocessing', category: 'data-ai', price: 'From $60', delivery: '3–7 days' },
  { name: 'Code Documentation', category: 'data-ai', price: 'From $40', delivery: '2–4 days' },
  { name: 'Dataset Finder Service', category: 'data-ai', price: 'From $30', delivery: '1–3 days' },
  { name: 'Survey Data Summarization', category: 'data-ai', price: 'From $40', delivery: '2–4 days' },

  // Writing, Content & Admin
  { name: 'Blog Writing & SEO Content', category: 'writing', price: 'From $30', delivery: '2–4 days' },
  { name: 'Social Media Content (Twitter/LinkedIn)', category: 'writing', price: 'From $25', delivery: '1–2 days' },
  { name: 'Website Content Updates', category: 'writing', price: 'From $30', delivery: '1–3 days' },
  { name: 'Email Drafting (Professional)', category: 'writing', price: 'From $20', delivery: '1 day' },
  { name: 'Agenda Preparation', category: 'writing', price: 'From $20', delivery: '1 day' },
  { name: 'Book Topic Research', category: 'writing', price: 'From $50', delivery: '3–5 days' },
  { name: 'Book Summary & Core Insights', category: 'writing', price: 'From $40', delivery: '2–4 days' },
  { name: 'Deep Research on Any Topic', category: 'writing', price: 'From $50', delivery: '3–7 days', popular: true },
  { name: 'Any Internet Research', category: 'writing', price: 'From $30', delivery: '1–3 days' },
  { name: 'Recruitment Materials & Flyers', category: 'writing', price: 'From $35', delivery: '2–3 days' },
  { name: 'Presentation Slides Design', category: 'writing', price: 'From $40', delivery: '2–4 days' },
  { name: 'Academic Poster Design', category: 'writing', price: 'From $50', delivery: '2–4 days' },
  { name: 'Meta Ads Campaign Management', category: 'writing', price: 'From $80', delivery: '3–7 days' },
  { name: 'General Article Writing', category: 'writing', price: 'From $40', delivery: '3–5 days' },
  { name: 'Medical & Healthcare Article Writing', category: 'writing', price: 'From $100', delivery: '5–10 days' },

  // Development & Deployment
  { name: 'Next.js Full-Stack Development', category: 'development', price: 'From $200', delivery: '7–21 days', popular: true },
  { name: 'Nest.js Backend Development', category: 'development', price: 'From $200', delivery: '7–21 days' },
  { name: 'Portfolio Website Development', category: 'development', price: 'From $150', delivery: '5–14 days', popular: true },
  { name: 'AWS Deployment & Setup', category: 'development', price: 'From $100', delivery: '2–5 days' },
  { name: 'AWS Cloud Infrastructure Management', category: 'development', price: 'From $100', delivery: '3–7 days' },

  // Document & Format Tools
  { name: 'Document Conversion (Word/PDF/LaTeX)', category: 'tools', price: 'From $20', delivery: '1 day' },
  { name: 'LaTeX Formatting & Typesetting', category: 'tools', price: 'From $40', delivery: '1–3 days', popular: true },
  { name: 'Indexing (Books/Reports)', category: 'tools', price: 'From $50', delivery: '3–5 days' },
  { name: 'Footnote/Endnote Formatting', category: 'tools', price: 'From $25', delivery: '1–2 days' },
  { name: 'Appendices & Supplementary Formatting', category: 'tools', price: 'From $30', delivery: '1–3 days' },
];

const categories: { label: string; value: ServiceCategory; count: number }[] = [
  { label: 'All Services', value: 'all', count: services.length },
  { label: 'Academic & Research', value: 'academic', count: services.filter(s => s.category === 'academic').length },
  { label: 'Data, AI & ML', value: 'data-ai', count: services.filter(s => s.category === 'data-ai').length },
  { label: 'Writing & Content', value: 'writing', count: services.filter(s => s.category === 'writing').length },
  { label: 'Development', value: 'development', count: services.filter(s => s.category === 'development').length },
  { label: 'Document Tools', value: 'tools', count: services.filter(s => s.category === 'tools').length },
];

// Smart search: synonym expansion for intelligent matching
const searchExpansions: Record<string, string[]> = {
  'latex': ['latex', 'typesetting', 'document conversion'],
  'tex': ['latex', 'typesetting'],
  'overleaf': ['latex', 'typesetting'],
  'yolo': ['annotation', 'model training', 'object detection', 'benchmarking', 'ml/ai/dl'],
  'object detection': ['annotation', 'model training', 'ml/ai/dl'],
  'annotation': ['annotation', 'labeling'],
  'labeling': ['annotation', 'labeling'],
  'ghost': ['blog', 'book', 'deep research'],
  'ghostwriting': ['blog', 'book', 'deep research'],
  'technical writing': ['code documentation', 'blog'],
  'publication': ['journal', 'citation', 'formatting', 'review', 'abstract', 'end-to-end'],
  'paper': ['journal', 'formatting', 'citation', 'copyediting', 'proofreading', 'abstract', 'reviewer', 'research', 'end-to-end', 'q1 paper'],
  'manuscript': ['journal', 'formatting', 'copyediting', 'proofreading', 'english-language'],
  'q1': ['end-to-end', 'q1 paper', 'journal', 'publication', 'formatting', 'citation'],
  'q1 paper': ['end-to-end', 'q1 paper', 'publication', 'journal'],
  'thesis': ['research plan', 'proofreading', 'statement of purpose', 'student'],
  'dissertation': ['research plan', 'proofreading', 'student'],
  'resume': ['cv editing'],
  'cv': ['cv editing', 'cover letter'],
  'sop': ['statement of purpose'],
  'website': ['next.js', 'portfolio', 'nest.js'],
  'react': ['next.js'],
  'node': ['nest.js'],
  'python': ['chart', 'visualization', 'model training', 'web scraping', 'python'],
  'spss': ['data', 'survey'],
  'machine learning': ['ml', 'model training', 'hyperparameter', 'benchmarking', 'experiment', 'annotation'],
  'deep learning': ['ml', 'dl', 'model training', 'hyperparameter'],
  'nlp': ['ml', 'model training'],
  'computer vision': ['ml', 'annotation', 'model training'],
  'neural network': ['ml', 'model training'],
  'cnn': ['model training', 'ml/ai/dl'],
  'transformer': ['model training', 'ml/ai/dl'],
  'bert': ['model training', 'ml/ai/dl'],
  'gpt': ['humanizing ai', 'ml/ai/dl'],
  'chatgpt': ['humanizing ai', 'paraphrasing'],
  'pytorch': ['model training'],
  'tensorflow': ['model training'],
  'keras': ['model training'],
  'aws': ['aws'],
  'cloud': ['aws'],
  'powerpoint': ['presentation', 'slides'],
  'ppt': ['presentation', 'slides'],
  'excel': ['data entry', 'table formatting'],
  'pdf': ['document conversion'],
  'word': ['document conversion'],
  'ieee': ['journal', 'latex', 'citation'],
  'acm': ['journal', 'latex'],
  'springer': ['journal', 'latex'],
  'elsevier': ['journal', 'latex'],
  'frontiers': ['journal', 'latex'],
  'apa': ['citation'],
  'mla': ['citation'],
  'chicago': ['citation'],
  'vancouver': ['citation'],
  'turnitin': ['plagiarism'],
  'research': ['literature', 'systematic', 'research', 'gap', 'deep research', 'grant', 'end-to-end'],
  'review': ['literature', 'systematic', 'reviewer', 'review'],
  'bibliography': ['annotated bibliography', 'citation', 'reference'],
  'scraping': ['web scraping', 'data extraction'],
  'scrape': ['web scraping'],
  'selenium': ['web scraping'],
  'beautifulsoup': ['web scraping'],
  'survey': ['survey', 'questionnaire', 'data collection'],
  'diagram': ['diagram', 'flowchart'],
  'flowchart': ['diagram', 'flowchart'],
  'poster': ['academic poster', 'infographic'],
  'conference': ['academic poster', 'presentation'],
  'infographic': ['infographic'],
  'seo': ['keyword', 'blog writing', 'seo'],
  'marketing': ['meta ads', 'seo', 'blog'],
  'facebook': ['meta ads'],
  'instagram': ['meta ads'],
  'advertising': ['meta ads'],
  'plagiarism': ['plagiarism', 'humanizing'],
  'grammar': ['proofreading', 'copyediting', 'english-language'],
  'proofread': ['proofreading', 'copyediting'],
  'edit': ['editing', 'copyediting', 'proofreading'],
  'format': ['formatting', 'journal', 'latex', 'citation', 'document conversion', 'table', 'footnote', 'appendices'],
  'citation': ['citation', 'reference', 'bibliography'],
  'reference': ['reference', 'citation', 'bibliography', 'cross-checking'],
  'grant': ['grant proposal'],
  'admission': ['student application', 'statement of purpose', 'cv', 'cover letter'],
  'scholarship': ['student application', 'statement of purpose'],
  'blog': ['blog writing'],
  'article': ['blog writing', 'article summarization', 'general article', 'medical'],
  'medical': ['medical', 'healthcare', 'article writing'],
  'health': ['medical', 'healthcare'],
  'medical writing': ['medical', 'healthcare', 'article writing'],
  'book': ['book topic', 'book summary'],
  'ebook': ['book topic', 'book summary'],
  'prisma': ['systematic review'],
  'meta-analysis': ['systematic review'],
  'cleaning': ['data cleaning', 'preprocessing'],
  'preprocessing': ['data cleaning', 'dataset curation'],
  'visualization': ['chart', 'visualization', 'infographic', 'diagram'],
  'dashboard': ['visualization', 'chart'],
  'kaggle': ['dataset finder'],
  'huggingface': ['dataset finder', 'model training'],
  'linkedin': ['social media'],
  'twitter': ['social media'],
};

function smartMatch(serviceName: string, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  const nameLower = serviceName.toLowerCase();

  // Direct name match
  if (nameLower.includes(q)) return true;

  // Exact synonym expansion
  const expansion = searchExpansions[q];
  if (expansion) {
    return expansion.some(term => nameLower.includes(term));
  }

  // Partial key match (min 3 chars to avoid noise)
  if (q.length >= 3) {
    for (const [key, terms] of Object.entries(searchExpansions)) {
      if (key.startsWith(q) || q.startsWith(key)) {
        if (terms.some(term => nameLower.includes(term))) return true;
      }
    }
  }

  return false;
}

/** Google-style pagination: 1, 2 … 7, 8 */
function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) pages.push('ellipsis');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

export default function ServiceCatalog() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Responsive items per page — show fewer on mobile
  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth <= 768 ? 3 : 9);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Listen for category filter events from Footer
  useEffect(() => {
    const handleFilterCatalog = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      const category = customEvent.detail.category as ServiceCategory;
      setActiveCategory(category);
      setSearchQuery('');
      setCurrentPage(1);
    };

    window.addEventListener('filter-catalog', handleFilterCatalog);
    return () => window.removeEventListener('filter-catalog', handleFilterCatalog);
  }, []);

  const promoActive = isPromoActive();

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearchQuery = smartMatch(service.name, searchQuery);
    // When searching, show results from all categories for better discovery
    return searchQuery.trim() ? matchesSearchQuery : (matchesCategory && matchesSearchQuery);
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  const handleCategoryChange = (category: ServiceCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    if (value.trim()) setActiveCategory('all');
  };

  return (
    <section id="service-catalog" className={`section ${styles.catalog}`}>
      <div className="container">
        <div className="section-header">
          <h2>Full Service Catalog</h2>
          <p>
            Browse our complete list of {services.length}+ services. Find exactly what you need
            and place your order in minutes.
          </p>
        </div>

        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search services... (e.g. LaTeX, YOLO, thesis, Python, ghostwriting)"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className={styles.clearSearch}
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.categoryTab} ${activeCategory === cat.value ? styles.categoryTabActive : ''}`}
              onClick={() => handleCategoryChange(cat.value)}
            >
              {cat.label}
              <span className={styles.categoryCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.resultsInfo}>
          Showing <strong>{paginatedServices.length}</strong> of <strong>{filteredServices.length}</strong> services
          {searchQuery && <> matching &quot;<strong>{searchQuery}</strong>&quot;</>}
          {totalPages > 1 && <> &nbsp;·&nbsp; Page {currentPage} of {totalPages}</>}
        </div>

        <div className={styles.servicesGrid}>
          {paginatedServices.map((service) => {
            const discount = promoActive ? getDiscountedPrice(service.price) : null;

            return (
              <div key={service.name} className={styles.serviceCard}>
                {service.popular && <span className={styles.popularTag}>Popular</span>}
                {promoActive && <span className={styles.discountTag}>-{PROMO_CONFIG.DISCOUNT_PERCENT}%</span>}
                <h4 className={styles.serviceName}>{service.name}</h4>
                <div className={styles.serviceMeta}>
                  {discount ? (
                    <span className={styles.servicePrice}>
                      <span className={styles.priceOriginal}>{service.price}</span>
                      <span className={styles.priceDiscounted}>From {discount.discounted}</span>
                    </span>
                  ) : (
                    <span className={styles.servicePrice}>{service.price}</span>
                  )}
                  <span className={styles.serviceDivider}>•</span>
                  <span className={styles.serviceDelivery}>⏱ {service.delivery}</span>
                </div>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.orderBtn}
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent('select-service', { detail: { service: service.name } })
                      );
                      const contactEl = document.getElementById('contact');
                      if (contactEl) {
                        const top = contactEl.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                  >
                    Order Now →
                  </button>
                  <a
                    href={`https://wa.me/923125065538?text=${encodeURIComponent(`Hi DeepDivers! I'm interested in: ${service.name}${discount ? ` (${discount.discounted})` : ` (${service.price})`}. Please share more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                    aria-label={`Order ${service.name} via WhatsApp`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <h4>No services found</h4>
            <p>Try a different search term or browse all categories.</p>
            <button
              className={styles.resetBtn}
              onClick={() => { handleSearchChange(''); handleCategoryChange('all'); }}
            >
              Show All Services
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <div className={styles.pageNumbers}>
              {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                page === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>…</span>
                ) : (
                  <button
                    key={page}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}

        <div className={styles.catalogCta}>
          <p>
            Don&apos;t see what you need? We offer custom services tailored to your specific requirements.
          </p>
          <a href="#contact" className={styles.catalogCtaBtn}>
            Request Custom Service →
          </a>
        </div>
      </div>
    </section>
  );
}
