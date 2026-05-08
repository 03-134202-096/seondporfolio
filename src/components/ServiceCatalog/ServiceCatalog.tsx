'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styles from './ServiceCatalog.module.css';
import { isPromoActive, getDiscountedPrice, PROMO_CONFIG } from '@/config/promo';

type ServiceCategory =
  | 'all'
  | 'academic'
  | 'data-ai'
  | 'writing'
  | 'development'
  | 'tools';

type SortOption = 'default' | 'alpha-asc' | 'alpha-desc' | 'price-asc' | 'price-desc';

interface ServiceItem {
  name: string;
  category: ServiceCategory;
  price: string;
  delivery: string;
  popular?: boolean;
  isCustom?: boolean;
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
  { name: 'End-to-End Review Paper Publication Support', category: 'academic', price: 'From $500', delivery: '14–30 days', popular: true },
  { name: 'End-to-End Experimental Paper Publication Support (GPU)', category: 'academic', price: '$450–$800', delivery: '1–2 months', popular: true },
  { name: 'Thesis & Dissertation Writing Support', category: 'academic', price: 'From $300', delivery: '14–30 days' },
  { name: 'Research Proposal Writing', category: 'academic', price: 'From $120', delivery: '5–10 days' },
  { name: 'Conference Paper Writing', category: 'academic', price: '$350–$700', delivery: '15–45 days' },
  { name: 'Manuscript Revision & Resubmission', category: 'academic', price: 'From $80', delivery: '3–7 days' },
  { name: 'Ethics Application Drafting (IRB/ERB)', category: 'academic', price: 'From $80', delivery: '3–5 days' },

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
  { name: 'Custom Visualization Scripts (Python)', category: 'data-ai', price: 'From $50', delivery: '2–4 days' },
  { name: 'ML/AI/DL Model Training', category: 'data-ai', price: 'From $150', delivery: '5–14 days', popular: true },
  { name: 'Hyperparameter Tuning', category: 'data-ai', price: 'From $80', delivery: '3–7 days' },
  { name: 'Experiment Execution & Logging', category: 'data-ai', price: 'From $100', delivery: '3–7 days' },
  { name: 'Benchmarking & Model Comparison', category: 'data-ai', price: 'From $80', delivery: '3–5 days' },
  { name: 'Web Scraping & Data Extraction', category: 'data-ai', price: 'From $50', delivery: '2–5 days', popular: true },
  { name: 'Dataset Curation & Organization', category: 'data-ai', price: 'From $60', delivery: '3–7 days' },
  { name: 'Code Documentation', category: 'data-ai', price: 'From $40', delivery: '2–4 days' },
  { name: 'Dataset Finder Service', category: 'data-ai', price: 'From $30', delivery: '1–3 days' },
  { name: 'Survey Data Summarization', category: 'data-ai', price: 'From $40', delivery: '2–4 days' },
  { name: 'GPU-Powered Experiment Execution', category: 'data-ai', price: '$100–$300', delivery: '3–14 days', popular: true },
  { name: 'Statistical Analysis (SPSS/Python/R)', category: 'data-ai', price: 'From $50', delivery: '2–5 days', popular: true },
  { name: 'NLP & Text Mining', category: 'data-ai', price: 'From $100', delivery: '5–10 days' },
  { name: 'Computer Vision Solutions', category: 'data-ai', price: 'From $150', delivery: '7–14 days' },
  { name: 'API Development & Integration', category: 'data-ai', price: 'From $80', delivery: '3–7 days' },
  { name: 'Database Design & Optimization', category: 'data-ai', price: 'From $80', delivery: '3–7 days' },

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
  { name: 'Technical Report Writing', category: 'writing', price: 'From $60', delivery: '3–7 days' },
  { name: 'White Paper Writing', category: 'writing', price: 'From $120', delivery: '5–10 days' },
  { name: 'Case Study Writing', category: 'writing', price: 'From $60', delivery: '3–5 days' },
  { name: 'Ghostwriting (Academic & Non-Academic)', category: 'writing', price: 'From $80', delivery: '5–14 days' },

  // Development & Deployment
  { name: 'Next.js Full-Stack Development', category: 'development', price: 'From $200', delivery: '7–21 days', popular: true },
  { name: 'Nest.js Backend Development', category: 'development', price: 'From $200', delivery: '7–21 days' },
  { name: 'Portfolio Website Development', category: 'development', price: 'From $150', delivery: '5–14 days', popular: true },
  { name: 'AWS Deployment & Setup', category: 'development', price: 'From $100', delivery: '2–5 days' },
  { name: 'AWS Cloud Infrastructure Management', category: 'development', price: 'From $100', delivery: '3–7 days' },
  { name: 'Python Scripting & Automation', category: 'development', price: 'From $60', delivery: '2–7 days' },
  { name: 'WordPress Website Development', category: 'development', price: 'From $150', delivery: '5–14 days' },
  { name: 'Bug Fixing & Code Review', category: 'development', price: 'From $40', delivery: '1–3 days' },

  // Document & Format Tools
  { name: 'Document Conversion (Word/PDF/LaTeX)', category: 'tools', price: 'From $20', delivery: '1 day' },
  { name: 'LaTeX Formatting & Typesetting', category: 'tools', price: 'From $40', delivery: '1–3 days', popular: true },
  { name: 'Indexing (Books/Reports)', category: 'tools', price: 'From $50', delivery: '3–5 days' },
  { name: 'Footnote/Endnote Formatting', category: 'tools', price: 'From $25', delivery: '1–2 days' },
  { name: 'Appendices & Supplementary Formatting', category: 'tools', price: 'From $30', delivery: '1–3 days' },
  { name: 'Overleaf Setup & Collaboration', category: 'tools', price: 'From $30', delivery: '1–2 days' },
  { name: 'Reference Manager Setup (Zotero/Mendeley)', category: 'tools', price: 'From $20', delivery: '1 day' },

  // Custom Project — always last
  { name: 'Custom Project', category: 'all', price: 'Custom Quote', delivery: 'Varies', isCustom: true },
];

const regularServices = services.filter(s => !s.isCustom);

const categories: { label: string; value: ServiceCategory; count: number }[] = [
  { label: 'All Services', value: 'all', count: regularServices.length },
  { label: 'Academic & Research', value: 'academic', count: regularServices.filter(s => s.category === 'academic').length },
  { label: 'Data, AI & ML', value: 'data-ai', count: regularServices.filter(s => s.category === 'data-ai').length },
  { label: 'Writing & Content', value: 'writing', count: regularServices.filter(s => s.category === 'writing').length },
  { label: 'Development', value: 'development', count: regularServices.filter(s => s.category === 'development').length },
  { label: 'Document Tools', value: 'tools', count: regularServices.filter(s => s.category === 'tools').length },
];

// Smart search: synonym expansion + keyword fragments for intelligent matching
const searchExpansions: Record<string, string[]> = {
  'latex': ['latex', 'typesetting', 'document conversion', 'overleaf'],
  'tex': ['latex', 'typesetting'],
  'overleaf': ['latex', 'typesetting', 'overleaf'],
  'yolo': ['annotation', 'model training', 'object detection', 'benchmarking', 'ml/ai/dl', 'computer vision'],
  'object detection': ['annotation', 'model training', 'ml/ai/dl', 'computer vision'],
  'annotation': ['annotation', 'labeling'],
  'labeling': ['annotation', 'labeling'],
  'ghost': ['blog', 'book', 'deep research', 'ghostwriting'],
  'ghostwriting': ['blog', 'book', 'deep research', 'ghostwriting'],
  'technical writing': ['code documentation', 'blog', 'technical report', 'white paper'],
  'publication': ['journal', 'citation', 'formatting', 'review', 'abstract', 'end-to-end', 'publication'],
  'paper': ['journal', 'formatting', 'citation', 'copyediting', 'proofreading', 'abstract', 'reviewer', 'research', 'end-to-end', 'review paper', 'experimental paper', 'conference paper', 'publication'],
  'full paper': ['end-to-end', 'review paper', 'experimental paper', 'publication', 'conference paper', 'manuscript'],
  'manuscript': ['journal', 'formatting', 'copyediting', 'proofreading', 'english-language', 'manuscript', 'revision'],
  'q1': ['end-to-end', 'review paper', 'publication', 'journal', 'formatting', 'citation'],
  'q1 paper': ['end-to-end', 'review paper', 'publication', 'journal'],
  'review paper': ['end-to-end review', 'publication', 'systematic review', 'literature'],
  'experimental': ['experimental paper', 'gpu', 'experiment execution', 'model training'],
  'experiment': ['experiment execution', 'gpu', 'experimental paper', 'benchmarking'],
  'gpu': ['gpu', 'experimental paper', 'model training', 'experiment execution'],
  'thesis': ['thesis', 'dissertation', 'research plan', 'proofreading', 'statement of purpose', 'student'],
  'dissertation': ['thesis', 'dissertation', 'research plan', 'proofreading', 'student'],
  'resume': ['cv editing'],
  'cv': ['cv editing', 'cover letter'],
  'sop': ['statement of purpose'],
  'website': ['next.js', 'portfolio', 'nest.js', 'wordpress'],
  'react': ['next.js'],
  'node': ['nest.js'],
  'python': ['chart', 'visualization', 'model training', 'web scraping', 'python', 'scripting', 'automation'],
  'spss': ['statistical analysis', 'data', 'survey'],
  'statistics': ['statistical analysis', 'spss', 'python', 'r'],
  'machine learning': ['ml', 'model training', 'hyperparameter', 'benchmarking', 'experiment', 'annotation', 'gpu'],
  'deep learning': ['ml', 'dl', 'model training', 'hyperparameter', 'gpu'],
  'nlp': ['ml', 'model training', 'nlp', 'text mining'],
  'computer vision': ['ml', 'annotation', 'model training', 'computer vision'],
  'neural network': ['ml', 'model training'],
  'cnn': ['model training', 'ml/ai/dl', 'computer vision'],
  'transformer': ['model training', 'ml/ai/dl', 'nlp'],
  'bert': ['model training', 'ml/ai/dl', 'nlp'],
  'gpt': ['humanizing ai', 'ml/ai/dl', 'nlp'],
  'chatgpt': ['humanizing ai', 'paraphrasing'],
  'pytorch': ['model training', 'gpu'],
  'tensorflow': ['model training', 'gpu'],
  'keras': ['model training'],
  'aws': ['aws'],
  'cloud': ['aws'],
  'powerpoint': ['presentation', 'slides'],
  'ppt': ['presentation', 'slides'],
  'excel': ['data entry', 'table formatting'],
  'pdf': ['document conversion'],
  'word': ['document conversion'],
  'ieee': ['journal', 'latex', 'citation', 'formatting'],
  'acm': ['journal', 'latex'],
  'springer': ['journal', 'latex'],
  'elsevier': ['journal', 'latex'],
  'frontiers': ['journal', 'latex'],
  'apa': ['citation'],
  'mla': ['citation'],
  'chicago': ['citation'],
  'vancouver': ['citation'],
  'turnitin': ['plagiarism'],
  'research': ['literature', 'systematic', 'research', 'gap', 'deep research', 'grant', 'end-to-end', 'research proposal'],
  'review': ['literature', 'systematic', 'reviewer', 'review', 'end-to-end review'],
  'bibliography': ['annotated bibliography', 'citation', 'reference'],
  'scraping': ['web scraping', 'data extraction'],
  'scrape': ['web scraping'],
  'selenium': ['web scraping'],
  'beautifulsoup': ['web scraping'],
  'survey': ['survey', 'questionnaire', 'data collection'],
  'diagram': ['diagram', 'flowchart'],
  'flowchart': ['diagram', 'flowchart'],
  'poster': ['academic poster', 'infographic'],
  'conference': ['academic poster', 'presentation', 'conference paper'],
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
  'reference': ['reference', 'citation', 'bibliography', 'cross-checking', 'reference manager', 'zotero', 'mendeley'],
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
  'irb': ['ethics application', 'irb'],
  'ethics': ['ethics application', 'irb'],
  'proposal': ['grant proposal', 'research proposal'],
  'white paper': ['white paper'],
  'case study': ['case study'],
  'bug': ['bug fixing', 'code review'],
  'debug': ['bug fixing', 'code review'],
  'code review': ['bug fixing', 'code review'],
  'api': ['api development', 'integration', 'data collection'],
  'database': ['database design', 'optimization'],
  'sql': ['database design'],
  'mongodb': ['database design'],
  'wordpress': ['wordpress'],
  'automation': ['python scripting', 'automation'],
  'script': ['python scripting', 'automation'],
  'custom': ['custom project'],
  'zotero': ['reference manager', 'zotero'],
  'mendeley': ['reference manager', 'mendeley'],
  'endnote': ['footnote', 'endnote'],
  'report': ['technical report'],
};

/** Compute relevance score: higher = better match. Returns 0 if no match. */
function getRelevanceScore(serviceName: string, query: string): number {
  if (!query.trim()) return 1;
  const q = query.toLowerCase().trim();
  const nameLower = serviceName.toLowerCase();

  // Exact full match
  if (nameLower === q) return 100;

  // Name contains the full query
  if (nameLower.includes(q)) return 80;

  // Multi-word query: check if all words appear in the name
  const queryWords = q.split(/\s+/).filter(w => w.length >= 2);
  if (queryWords.length > 1) {
    const allPresent = queryWords.every(w => nameLower.includes(w));
    if (allPresent) return 70;
    const somePresent = queryWords.filter(w => nameLower.includes(w)).length;
    if (somePresent > 0) {
      const partialScore = 30 + (somePresent / queryWords.length) * 30;
      // Also check synonym expansion for missing words
      const missingWords = queryWords.filter(w => !nameLower.includes(w));
      let synonymBonus = 0;
      for (const w of missingWords) {
        const expansion = searchExpansions[w];
        if (expansion && expansion.some(term => nameLower.includes(term))) {
          synonymBonus += 10;
        }
      }
      return partialScore + synonymBonus;
    }
  }

  // Exact synonym expansion
  const expansion = searchExpansions[q];
  if (expansion) {
    const matchCount = expansion.filter(term => nameLower.includes(term)).length;
    if (matchCount > 0) return 50 + matchCount * 5;
  }

  // Partial key match (min 3 chars)
  if (q.length >= 3) {
    for (const [key, terms] of Object.entries(searchExpansions)) {
      if (key.startsWith(q) || q.startsWith(key)) {
        const matchCount = terms.filter(term => nameLower.includes(term)).length;
        if (matchCount > 0) return 40 + matchCount * 3;
      }
    }
  }

  // Individual word synonym expansion for multi-word queries
  if (queryWords.length > 1) {
    let totalScore = 0;
    for (const w of queryWords) {
      const wordExpansion = searchExpansions[w];
      if (wordExpansion && wordExpansion.some(term => nameLower.includes(term))) {
        totalScore += 15;
      }
    }
    if (totalScore > 0) return totalScore;
  }

  return 0;
}

function smartMatch(serviceName: string, query: string): boolean {
  return getRelevanceScore(serviceName, query) > 0;
}

/** Extract numeric price from price string for sorting */
function extractPrice(priceStr: string): number {
  if (priceStr === 'Custom Quote') return Infinity;
  const match = priceStr.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
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
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isMobile, setIsMobile] = useState(false);
  const [tabsCanScrollLeft, setTabsCanScrollLeft] = useState(false);
  const [tabsCanScrollRight, setTabsCanScrollRight] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const updateTabsScroll = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setTabsCanScrollLeft(el.scrollLeft > 4);
    setTabsCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    updateTabsScroll();
    el.addEventListener('scroll', updateTabsScroll, { passive: true });
    const ro = new ResizeObserver(updateTabsScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateTabsScroll);
      ro.disconnect();
    };
  }, [updateTabsScroll]);

  // Responsive items per page — show fewer on mobile
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setItemsPerPage(w <= 768 ? 3 : w >= 1440 ? 12 : 9);
      setIsMobile(w <= 640);
    };
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

  const filteredServices = useMemo(() => {
    // Separate regular and custom services
    const regular = services.filter(s => !s.isCustom);
    const custom = services.find(s => s.isCustom);

    let result = regular.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesSearchQuery = smartMatch(service.name, searchQuery);
      // When searching, show results from all categories for better discovery
      return searchQuery.trim() ? matchesSearchQuery : (matchesCategory && matchesSearchQuery);
    });

    // Sort by relevance when searching
    if (searchQuery.trim()) {
      result.sort((a, b) => getRelevanceScore(b.name, searchQuery) - getRelevanceScore(a.name, searchQuery));
    }

    // Apply sort option
    if (sortBy === 'alpha-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alpha-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    }

    // Always append custom project card at the end
    if (custom) result.push(custom);

    return result;
  }, [activeCategory, searchQuery, sortBy, promoActive]);

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

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <section id="service-catalog" className={`section ${styles.catalog}`}>
      <div className="container">
        <div className="section-header">
          <h2>Full Service Catalog</h2>
          <p>
            Browse our complete list of {regularServices.length}+ services. Find exactly what you need
            and place your order in minutes.
          </p>
        </div>

        {/* Controls Row: Search Bar on top, then Info + Sort */}
        <div className={styles.controlsRow}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder={isMobile ? "Search services..." : "Search services... (e.g. full paper, LaTeX, thesis, Python, GPU, statistics)"}
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

          <div className={styles.controlsMeta}>
            <div className={styles.resultsInfo}>
              Showing <strong>{paginatedServices.length}</strong> of <strong>{filteredServices.length}</strong>
              <span className={styles.resultsInfoDetail}>
                {' '}services
                {searchQuery && <> matching &quot;<strong>{searchQuery}</strong>&quot;</>}
                {totalPages > 1 && <> &nbsp;·&nbsp; Page {currentPage} of {totalPages}</>}
              </span>
            </div>

            <div className={styles.sortControl}>
              <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
              <select
                id="sort-select"
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
              >
                <option value="default">{searchQuery.trim() ? 'Relevance' : 'Default'}</option>
                <option value="alpha-asc">Name (A → Z)</option>
                <option value="alpha-desc">Name (Z → A)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          className={styles.categoryTabsWrapper}
          data-scroll-left={tabsCanScrollLeft}
          data-scroll-right={tabsCanScrollRight}
        >
          <div className={styles.categoryTabs} ref={tabsRef}>
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
        </div>

        <div className={styles.servicesGrid}>
          {paginatedServices.map((service) => {
            // Custom project card
            if (service.isCustom) {
              return (
                <div key={service.name} className={`${styles.serviceCard} ${styles.serviceCardCustom}`}>
                  <span className={styles.customTag}>Custom</span>
                  <h4 className={styles.serviceName}>{service.name}</h4>
                  <p className={styles.customDescription}>
                    Have a unique requirement? Describe your project and get a tailored quote.
                  </p>
                  <div className={styles.cardActions}>
                    <a
                      href={`https://wa.me/923125065538?text=${encodeURIComponent('Hi DeepDivers! I have a custom project. Here are the details:')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.customWhatsappBtn}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>
              );
            }

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
              onClick={() => { handleSearchChange(''); handleCategoryChange('all'); handleSortChange('default'); }}
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
