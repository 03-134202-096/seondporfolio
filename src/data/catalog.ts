/**
 * Service catalog — every service with its starting price and turnaround.
 * The homepage catalog and the individual service pages both read this list,
 * so a price changed here updates everywhere.
 */

export type ServiceCategory =
  | 'all'
  | 'academic'
  | 'data-ai'
  | 'writing'
  | 'development'
  | 'tools';

export interface ServiceItem {
  name: string;
  category: ServiceCategory;
  price: string;
  delivery: string;
  popular?: boolean;
  isCustom?: boolean;
}

export const services: ServiceItem[] = [
  // Academic Services
  { name: 'Journal-Style Formatting', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Copyediting', category: 'academic', price: 'From $30', delivery: '1–3 days' },
  { name: 'Proofreading', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Fact-Checking', category: 'academic', price: 'From $30', delivery: '2–3 days' },
  { name: 'Citation Formatting (APA/MLA/Chicago/Vancouver)', category: 'academic', price: 'From $25', delivery: '1–2 days', popular: true },
  { name: 'Plagiarism Screening & Report', category: 'academic', price: 'From $20', delivery: '1 day' },
  { name: 'English-Language Editing', category: 'academic', price: 'From $35', delivery: '2–3 days' },
  { name: 'Literature Search', category: 'academic', price: 'From $50', delivery: '3–5 days', popular: true },
  { name: 'Systematic Review Support', category: 'academic', price: 'From $150', delivery: '7–14 days' },
  { name: 'Annotated Bibliography & Source Summaries', category: 'academic', price: 'From $40', delivery: '2–4 days' },
  { name: 'Article Summarization', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Research Gap Analysis', category: 'academic', price: 'From $60', delivery: '3–5 days' },
  { name: 'Grant Proposal Development Support', category: 'academic', price: 'From $200', delivery: '7–14 days' },
  { name: 'Grant Proposal Editing', category: 'academic', price: 'From $80', delivery: '3–5 days' },
  { name: 'CV Editing for Researchers', category: 'academic', price: 'From $35', delivery: '1–2 days' },
  { name: 'Cover Letter Writing', category: 'academic', price: 'From $30', delivery: '1–2 days' },
  { name: 'Statement of Purpose Editing', category: 'academic', price: 'From $35', delivery: '1–2 days' },
  { name: 'Research Plan & Methodology Consultation', category: 'academic', price: 'From $100', delivery: '5–7 days' },
  { name: 'Journal Selection Research', category: 'academic', price: 'From $30', delivery: '1–2 days' },
  { name: 'Reviewer Response Assistance', category: 'academic', price: 'From $60', delivery: '3–5 days' },
  { name: 'Abstract Editing & Optimisation', category: 'academic', price: 'From $25', delivery: '1–2 days' },
  { name: 'Keyword Selection & SEO', category: 'academic', price: 'From $20', delivery: '1 day' },
  { name: 'Student Application Assistance', category: 'academic', price: 'From $50', delivery: '2–4 days' },
  { name: 'Reference Cross-Checking', category: 'academic', price: 'From $25', delivery: '1–2 days' },
    { name: 'Paraphrasing & Clarity Editing (Your Own Text)', category: 'academic', price: 'From $30', delivery: '1–3 days' },
  { name: 'Review Paper Support Package (Search, Screening, PRISMA, Editing)', category: 'academic', price: '$800', delivery: '14–30 days', popular: true },
  { name: 'Experimental Research Support Package (GPU Experiments, Analysis, Editing)', category: 'academic', price: '$1100', delivery: '1–2 months', popular: true },
  { name: 'Thesis & Dissertation Support Package (Guidance, Analysis, Editing)', category: 'academic', price: '$1000', delivery: '14–30 days' },
  { name: 'Research Proposal Development & Review', category: 'academic', price: 'From $120', delivery: '5–10 days' },
  { name: 'Conference Paper Development Support', category: 'academic', price: '$1000', delivery: '15–45 days' },
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
  { name: 'Ghostwriting (Non-Academic: Blogs, Books, Business)', category: 'writing', price: 'From $80', delivery: '5–14 days' },

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

/** Looks up a catalog entry by its exact name (used by the service pages) */
export function getCatalogItem(name: string): ServiceItem | undefined {
  return services.find((service) => service.name === name);
}
