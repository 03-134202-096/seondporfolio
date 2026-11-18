/**
 * One page per core service (/services/[slug]).
 *
 * Wording rule: the client stays the author. We analyse, edit, format, guide,
 * train and run experiments; we don't write work to be submitted as someone
 * else's, take exams, or guarantee grades, acceptance or publication.
 *
 * Prices and turnaround come from the catalog (src/data/catalog.ts) through
 * `catalogItems`, so they always match the homepage catalog.
 */

export interface ServicePageFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  /** Page heading (H1) */
  name: string;
  /** Short name for cards, menus and breadcrumbs */
  shortName: string;
  /** <title> before " | DeepDivers" — keep under 47 characters */
  metaTitle: string;
  /** Meta description without the price; the page adds "From $X." (keep under 140) */
  metaDescription: string;
  icon: string;
  /** One-line summary for service cards */
  summary: string;
  /** Opening paragraph under the H1 */
  intro: string;
  audience: string[];
  included: { title: string; description: string }[];
  process: { title: string; description: string }[];
  tools: string[];
  /** Exact catalog names, cheapest-first order is not required */
  catalogItems: string[];
  /** schema.org serviceType */
  serviceType: string;
  faqs: ServicePageFaq[];
  /** Blog slugs of the guides for this service */
  relatedGuides: string[];
}

/** Shown on every academic service page */
export const AUTHORSHIP_NOTE =
  'You stay the author of your work. We analyse, edit, format, explain and train — we don’t write assignments to be submitted as your own, take exams, or promise grades, acceptance or publication. Please check your institution’s rules on outside help; most allow statistical consulting and editing when it is acknowledged.';

const standardProcess = [
  {
    title: 'Send your brief',
    description: 'Share your files, guidelines and deadline through the quote form, email or WhatsApp. An NDA is available on request.',
  },
  {
    title: 'Get a fixed quote',
    description: 'We reply within 24 hours with the scope, price in USD and delivery date. Nothing starts until you approve it.',
  },
  {
    title: 'Pay securely',
    description: 'Pay by card, bank transfer or Payoneer balance through a Payoneer payment link. Large projects can be split into milestones.',
  },
  {
    title: 'Review and revise',
    description: 'You receive the work with notes explaining what we did, and we revise it until it matches the agreed scope.',
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'statistical-analysis',
    name: 'Statistical Analysis Help for Theses, Dissertations and Papers',
    shortName: 'Statistical Analysis',
    metaTitle: 'Statistical Analysis Help: SPSS, R, Python',
    metaDescription:
      'Statistical analysis for theses, dissertations and journal papers in SPSS, R, Python and SmartPLS, with clear output tables.',
    icon: '📊',
    summary: 'SPSS, R, Python and SmartPLS analysis with clear tables, charts and an explanation of every result.',
    intro:
      'Have data but not sure which test to run, or how to report it? We clean your dataset, choose and run the right analysis, and hand back publication-ready tables and charts with a plain-English explanation, so you can write up and defend the results yourself.',
    audience: [
      'Master’s and PhD students analysing survey or experimental data',
      'Researchers preparing results for a journal submission or revision',
      'Faculty and research teams who need a second analyst or a re-analysis',
      'Organisations evaluating survey, programme or operational data',
    ],
    included: [
      { title: 'Data cleaning and coding', description: 'Missing values, outliers, reverse-coded items, recoding and a documented cleaning log.' },
      { title: 'Choosing the right tests', description: 'Assumption checks and the tests that fit your design: t-tests, ANOVA, chi-square, correlation, regression, mixed models and more.' },
      { title: 'Measurement and SEM', description: 'Reliability (Cronbach’s alpha), factor analysis and PLS-SEM in SmartPLS when your model needs it.' },
      { title: 'Tables and figures', description: 'APA-style tables and clear charts you can drop into your thesis or manuscript.' },
      { title: 'Explanation you can defend', description: 'A short report on what was run, why, and what each result means, plus a call to walk through it if you want one.' },
      { title: 'Reproducible files', description: 'Your SPSS output, R or Python scripts and the cleaned dataset, so every number can be checked.' },
    ],
    process: standardProcess,
    tools: ['SPSS', 'R', 'Python (pandas, statsmodels)', 'SmartPLS', 'Excel'],
    catalogItems: [
      'Statistical Analysis (SPSS/Python/R)',
      'Data Cleaning & Preprocessing',
      'Survey Design & Development',
      'Survey Data Summarization',
      'Chart & Graph Creation (Python)',
      'Custom Visualization Scripts (Python)',
    ],
    serviceType: 'Statistical analysis consulting',
    faqs: [
      {
        question: 'Which software do you use for the analysis?',
        answer: 'SPSS, R, Python or SmartPLS, whichever your supervisor, journal or team expects. If you have no preference we suggest the simplest tool that fits your design and send you the files so the analysis can be reproduced.',
      },
      {
        question: 'Will you write my results or discussion chapter?',
        answer: 'No. We run the analysis, produce the tables and figures, and explain what each result means so you can write the chapter in your own words. We are happy to review your write-up for statistical accuracy afterwards.',
      },
      {
        question: 'What do you need from me to quote?',
        answer: 'Your research questions or hypotheses, the dataset (or a sample of it), and any guidelines from your university or journal. A short description of your variables helps us quote accurately.',
      },
      {
        question: 'Is my data kept confidential?',
        answer: 'Yes. Data is used only for your project, never shared, and deleted on request. Please remove names or other direct identifiers before sending; we can sign an NDA if required.',
      },
    ],
    relatedGuides: ['how-to-report-pls-sem-results-smartpls', 'spss-vs-python-vs-r-best-tool-data-analysis-2026'],
  },
  {
    slug: 'academic-editing-proofreading',
    name: 'Academic Editing and Proofreading for Researchers',
    shortName: 'Editing & Proofreading',
    metaTitle: 'Academic Editing & Proofreading Service',
    metaDescription:
      'Academic editing and proofreading for researchers and non-native English authors: clarity, grammar, flow and consistency.',
    icon: '✍️',
    summary: 'Language editing and proofreading for manuscripts, theses and proposals, with tracked changes.',
    intro:
      'Good research can be rejected for unclear English. We edit your manuscript, thesis or proposal for grammar, clarity, flow and consistency while keeping your meaning and your voice, and every change is tracked so you stay in control.',
    audience: [
      'Researchers preparing a journal or conference submission',
      'Non-native English authors who want their writing to read naturally',
      'PhD and Master’s candidates finalising a thesis they have written',
      'Academics polishing grant applications, CVs and cover letters',
    ],
    included: [
      { title: 'Proofreading', description: 'A final check for spelling, grammar, punctuation and typos before submission.' },
      { title: 'Copyediting', description: 'Sentence-level editing for clarity, concision, academic tone and consistent terminology.' },
      { title: 'English-language editing', description: 'Deeper editing for non-native authors so the text reads naturally to international reviewers.' },
      { title: 'Abstract and title polishing', description: 'Tighter abstracts and titles that state your contribution clearly within the word limit.' },
      { title: 'Consistency checks', description: 'Abbreviations, numbers, units, figure and table call-outs, and in-text citations against the reference list.' },
      { title: 'Tracked changes and comments', description: 'Every edit is visible in Word or as a LaTeX diff, with comments wherever a sentence was unclear.' },
    ],
    process: standardProcess,
    tools: ['Microsoft Word (Track Changes)', 'LaTeX / Overleaf', 'Grammar and plagiarism checkers on request'],
    catalogItems: [
      'Proofreading',
      'Copyediting',
      'English-Language Editing',
      'Abstract Editing & Optimisation',
      'Paraphrasing & Clarity Editing (Your Own Text)',
      'Fact-Checking',
      'Reference Cross-Checking',
      'Plagiarism Screening & Report',
      'CV Editing for Researchers',
      'Statement of Purpose Editing',
    ],
    serviceType: 'Academic editing and proofreading',
    faqs: [
      {
        question: 'What is the difference between proofreading and editing?',
        answer: 'Proofreading fixes surface errors such as spelling, grammar and punctuation in a near-final text. Copyediting and English-language editing go further and improve sentence structure, clarity and flow. If you are unsure, send the document and we will recommend the right level.',
      },
      {
        question: 'Will editing change my ideas or arguments?',
        answer: 'No. We improve how the text reads, not what it says. Content questions are left as comments for you to decide on.',
      },
      {
        question: 'Can you edit LaTeX files?',
        answer: 'Yes. We can edit directly in your Overleaf project or .tex files and send a marked-up PDF diff so you can review each change.',
      },
      {
        question: 'Do you guarantee acceptance after editing?',
        answer: 'No one honestly can. Editing removes language problems that distract reviewers, but acceptance depends on the research and the editors’ decision.',
      },
    ],
    relatedGuides: ['how-to-publish-research-paper-q1-journal-2026-guide', 'research-ethics-ai-generated-content-academic-publishing-2026'],
  },
  {
    slug: 'journal-formatting-latex',
    name: 'Journal Formatting, LaTeX Typesetting and Referencing',
    shortName: 'Formatting & LaTeX',
    metaTitle: 'Journal Formatting, LaTeX & Referencing',
    metaDescription:
      'Format a manuscript or thesis to journal or university rules: Word or LaTeX/Overleaf templates, APA 7, IEEE and Vancouver styles.',
    icon: '📐',
    summary: 'Word and LaTeX formatting to journal or university guidelines, with references in any style.',
    intro:
      'Desk rejections for formatting are avoidable. We format your manuscript or thesis to the exact author guidelines, whether that means a Word template, an IEEE, Springer, Elsevier or ACM LaTeX class, or your university’s thesis rules, and we check that every reference matches the required style.',
    audience: [
      'Authors submitting to a journal or conference with strict templates',
      'Researchers moving a paper from Word to LaTeX (or back)',
      'Students finishing a thesis to university formatting rules',
      'Teams resubmitting to a different journal after a rejection',
    ],
    included: [
      { title: 'Journal template formatting', description: 'Headings, margins, fonts, sections, figures, tables and supplementary files laid out to the guidelines.' },
      { title: 'LaTeX and Overleaf', description: 'Typesetting in the publisher’s class, bibliography with BibTeX or BibLaTeX, and an Overleaf project you can share.' },
      { title: 'Citations and references', description: 'APA 7, IEEE, Vancouver, Harvard, Chicago or the journal’s own style, with in-text citations checked against the list.' },
      { title: 'Tables and figures', description: 'Tables rebuilt to journal specs and figures exported at the required resolution and format.' },
      { title: 'Document conversion', description: 'Clean conversion between Word, LaTeX and PDF without broken equations or references.' },
      { title: 'Reference manager setup', description: 'Zotero or Mendeley libraries organised so your references stay consistent from now on.' },
    ],
    process: standardProcess,
    tools: ['LaTeX / Overleaf', 'BibTeX / BibLaTeX', 'Microsoft Word', 'Zotero', 'Mendeley'],
    catalogItems: [
      'Journal-Style Formatting',
      'Citation Formatting (APA/MLA/Chicago/Vancouver)',
      'LaTeX Formatting & Typesetting',
      'Overleaf Setup & Collaboration',
      'Document Conversion (Word/PDF/LaTeX)',
      'Table Formatting (Journal Specs)',
      'Footnote/Endnote Formatting',
      'Appendices & Supplementary Formatting',
      'Reference Manager Setup (Zotero/Mendeley)',
    ],
    serviceType: 'Manuscript formatting and typesetting',
    faqs: [
      {
        question: 'Which journal templates can you work with?',
        answer: 'Any journal or conference that publishes author guidelines, including IEEE, Springer, Elsevier, ACM, Wiley, Frontiers and MDPI templates in Word or LaTeX. Send the link to the guidelines with your files.',
      },
      {
        question: 'Can you convert my Word manuscript to LaTeX?',
        answer: 'Yes. We rebuild it in the required LaTeX class, convert equations and tables, create the .bib file and share a working Overleaf project.',
      },
      {
        question: 'Do you change the content while formatting?',
        answer: 'No. Formatting only changes layout, styles and references. If we notice language problems we flag them, and you can add editing if you want it.',
      },
      {
        question: 'How fast is formatting?',
        answer: 'Most formatting and referencing jobs take one to three days, depending on length and how many references need fixing.',
      },
    ],
    relatedGuides: ['apa-7-formatting-checklist-thesis-research-paper', 'how-to-publish-research-paper-q1-journal-2026-guide', 'how-to-avoid-predatory-journals-2026-complete-guide'],
  },
  {
    slug: 'systematic-review-support',
    name: 'Systematic Review and Meta-Analysis Support (PRISMA 2020)',
    shortName: 'Systematic Reviews',
    metaTitle: 'Systematic Review & Meta-Analysis Support',
    metaDescription:
      'PRISMA 2020 systematic review support: search strategies, screening, data extraction, risk of bias and meta-analysis in R.',
    icon: '🔎',
    summary: 'Search strategies, screening, data extraction and meta-analysis, following PRISMA 2020.',
    intro:
      'Systematic reviews take months because every step has to be documented. We work alongside you on the time-consuming parts — building and running the search, screening records, extracting data, assessing risk of bias and running the meta-analysis — and keep a full audit trail so your review meets PRISMA 2020.',
    audience: [
      'Clinicians and health researchers running a systematic review or meta-analysis',
      'PhD students whose thesis includes a systematic literature review',
      'Research teams who need a second reviewer for screening and extraction',
      'Authors updating an existing review with new studies',
    ],
    included: [
      { title: 'Protocol and search strategy', description: 'PICO or SPIDER framing, database-specific search strings and help preparing a PROSPERO registration.' },
      { title: 'Searching and de-duplication', description: 'Searches in the databases you have access to (such as PubMed, Scopus, Web of Science or IEEE Xplore), exported and de-duplicated.' },
      { title: 'Screening', description: 'Title, abstract and full-text screening against your criteria, with reasons for exclusion recorded.' },
      { title: 'Data extraction and quality', description: 'Extraction forms and risk-of-bias or quality assessment with the tool that fits your study designs.' },
      { title: 'Meta-analysis', description: 'Pooled effects, heterogeneity, subgroup and sensitivity analyses and forest and funnel plots in R.' },
      { title: 'PRISMA reporting', description: 'A PRISMA 2020 flow diagram and checklist mapped to your manuscript.' },
    ],
    process: standardProcess,
    tools: ['PubMed', 'Scopus / Web of Science (your access)', 'Rayyan', 'Zotero', 'R (meta, metafor)'],
    catalogItems: [
      'Systematic Review Support',
      'Literature Search',
      'Research Gap Analysis',
      'Annotated Bibliography & Source Summaries',
      'Article Summarization',
      'Review Paper Support Package (Search, Screening, PRISMA, Editing)',
    ],
    serviceType: 'Systematic review and meta-analysis support',
    faqs: [
      {
        question: 'Can you act as the second reviewer for screening?',
        answer: 'Yes. We can screen independently against your criteria and then reconcile disagreements with you, which is how most review protocols handle dual screening.',
      },
      {
        question: 'Do you have access to paid databases?',
        answer: 'We search freely available databases ourselves. For Scopus, Web of Science, Embase or CINAHL we work through your institutional access or a shared export, which keeps the search reproducible under your affiliation.',
      },
      {
        question: 'Will you write the review paper for me?',
        answer: 'No. You and your co-authors write the review. We deliver the search, screening records, extraction tables, analyses and PRISMA materials, and we can edit your draft for language and consistency.',
      },
      {
        question: 'How long does a systematic review take?',
        answer: 'Supporting a single step can take a few days. A complete search-to-meta-analysis workflow usually takes several weeks, depending on how many records the search returns.',
      },
    ],
    relatedGuides: ['how-to-write-systematic-review-prisma-2026'],
  },
  {
    slug: 'research-proposal-consultation',
    name: 'Research Proposal and Methodology Consultation',
    shortName: 'Proposals & Methodology',
    metaTitle: 'Research Proposal & Methodology Consultation',
    metaDescription:
      'One-to-one help to plan and strengthen your research proposal: questions, design, sampling, methods, ethics and grants.',
    icon: '🧭',
    summary: 'One-to-one help to sharpen research questions, design, methods, ethics applications and grant proposals.',
    intro:
      'A strong proposal starts with a clear question and a design that can answer it. We review your draft, test the logic from problem to method, suggest sampling and analysis plans, and help you prepare ethics and funding applications, so the proposal you submit is your own and much stronger.',
    audience: [
      'Master’s and PhD applicants and candidates developing a proposal',
      'Researchers planning a study, survey or experiment',
      'Academics preparing grant applications and funding bids',
      'Teams preparing ethics (IRB/ERB) submissions',
    ],
    included: [
      { title: 'Proposal review', description: 'Detailed feedback on your problem statement, aims, research questions and contribution.' },
      { title: 'Methodology consultation', description: 'Design, sampling, sample size, instruments and an analysis plan that fits your questions.' },
      { title: 'Literature positioning', description: 'Help finding key studies and the gap your project fills, with sources you can read and cite.' },
      { title: 'Ethics applications', description: 'Structure and checks for IRB or ERB forms, consent documents and data management plans.' },
      { title: 'Grant proposals', description: 'Structure, clarity and alignment with the funder’s criteria for research grant applications.' },
      { title: 'Live sessions', description: 'Video calls to talk through your plan, scheduled across US, UK/EU, Gulf and Australian time zones.' },
    ],
    process: standardProcess,
    tools: ['Microsoft Word comments', 'Google Docs', 'Zoom / Google Meet', 'G*Power for sample size'],
    catalogItems: [
      'Research Proposal Development & Review',
      'Research Plan & Methodology Consultation',
      'Ethics Application Drafting (IRB/ERB)',
      'Grant Proposal Editing',
      'Grant Proposal Development Support',
      'Thesis & Dissertation Support Package (Guidance, Analysis, Editing)',
    ],
    serviceType: 'Research methodology consultation',
    faqs: [
      {
        question: 'Can you help if I only have a topic idea?',
        answer: 'Yes. In a first session we help you narrow the topic into answerable research questions and outline a feasible design. You then draft the proposal and we review it.',
      },
      {
        question: 'Do you write the proposal for me?',
        answer: 'For student proposals, no: you write it and we coach, review and edit. For grant applications by researchers and organisations, we can help structure and draft sections with you as the named applicant and author.',
      },
      {
        question: 'Can you calculate my sample size?',
        answer: 'Yes. We run a power analysis for your planned tests and explain the assumptions so you can justify the number in your methods section.',
      },
      {
        question: 'Do you offer live calls?',
        answer: 'Yes. Calls are scheduled at a time that suits you; tell us your time zone in the quote form.',
      },
    ],
    relatedGuides: ['research-ethics-ai-generated-content-academic-publishing-2026'],
  },
  {
    slug: 'reviewer-response-support',
    name: 'Responding to Reviewer Comments and Manuscript Revision',
    shortName: 'Reviewer Responses',
    metaTitle: 'Reviewer Response & Revision Support',
    metaDescription:
      'Answer peer-review comments clearly and completely: point-by-point response letters, revision plans and extra analyses.',
    icon: '💬',
    summary: 'Point-by-point response letters, revision plans, extra analyses and resubmission formatting.',
    intro:
      'A major revision is a second chance. We help you read the reviewers’ comments, plan the changes, run any extra analyses they ask for, and structure a polite, complete point-by-point response, so the editor can see that every comment has been addressed.',
    audience: [
      'Authors with a major or minor revision decision',
      'Researchers resubmitting to a new journal after rejection',
      'Early-career researchers handling their first peer review',
      'Teams that need extra analyses or experiments for a revision',
    ],
    included: [
      { title: 'Comment analysis', description: 'Every comment grouped, prioritised and matched to the change it needs.' },
      { title: 'Revision plan', description: 'A checklist of edits, new analyses and clarifications, with suggested wording for you to adapt.' },
      { title: 'Response letter', description: 'A structured point-by-point letter that quotes each comment and shows where and how it was addressed.' },
      { title: 'Extra analyses', description: 'Additional statistics, robustness checks or ML experiments that reviewers request.' },
      { title: 'Language and consistency', description: 'Editing of the revised sections so the new text matches the rest of the manuscript.' },
      { title: 'Resubmission package', description: 'Clean and tracked versions, cover letter and formatting for the target journal.' },
    ],
    process: standardProcess,
    tools: ['Microsoft Word (Track Changes)', 'LaTeX / Overleaf (latexdiff)', 'SPSS, R and Python for new analyses'],
    catalogItems: [
      'Reviewer Response Assistance',
      'Manuscript Revision & Resubmission',
      'Journal Selection Research',
      'Cover Letter Writing',
    ],
    serviceType: 'Peer review response and manuscript revision support',
    faqs: [
      {
        question: 'What if I disagree with a reviewer?',
        answer: 'That is allowed. We help you respond respectfully with evidence and, where possible, a partial change, which editors usually accept better than a flat refusal.',
      },
      {
        question: 'Can you run the extra analyses the reviewers asked for?',
        answer: 'Yes. Send the original data and code or output, and we run the requested tests or experiments and explain the results for your response.',
      },
      {
        question: 'How quickly can you help before my revision deadline?',
        answer: 'Response letters and revision plans usually take three to five days. Tell us your deadline in the quote form and we will confirm what is realistic.',
      },
      {
        question: 'Can you help choose a new journal after a rejection?',
        answer: 'Yes. We shortlist suitable indexed journals, check scope, open-access fees and timelines, and flag predatory outlets to avoid.',
      },
    ],
    relatedGuides: ['how-to-respond-peer-review-comments-effectively', 'how-to-avoid-predatory-journals-2026-complete-guide'],
  },
  {
    slug: 'machine-learning-research',
    name: 'Machine Learning and AI Research Support',
    shortName: 'Machine Learning Research',
    metaTitle: 'Machine Learning Research Support',
    metaDescription:
      'ML and deep learning experiments for researchers: model training, GPU runs, benchmarking and reproducible PyTorch code.',
    icon: '🤖',
    summary: 'Model training, GPU experiments, benchmarking and reproducible code for research projects.',
    intro:
      'From a working baseline to a full set of experiments, we help researchers build, train and evaluate machine learning and deep learning models. You get reproducible code, logged results and clear figures, from a team that has published deep learning research in IEEE Access, Frontiers in Medicine and Computers, Materials & Continua.',
    audience: [
      'PhD students and researchers whose project needs ML experiments',
      'Authors who need baselines, ablations or benchmarks for a paper or revision',
      'Labs and startups that need GPU training run and documented',
      'Clinicians and domain experts applying AI to medical or other data',
    ],
    included: [
      { title: 'Model development', description: 'CNNs, vision transformers, LSTMs, graph attention networks and classical ML, chosen to fit your data.' },
      { title: 'Training on GPUs', description: 'Experiments run on GPUs with logged metrics, saved checkpoints and fixed random seeds.' },
      { title: 'Tuning and ablations', description: 'Hyperparameter searches, ablation studies and comparisons against published baselines.' },
      { title: 'Evaluation', description: 'Proper train/validation/test splits, leakage checks, confusion matrices, ROC curves and statistical comparisons.' },
      { title: 'Data preparation', description: 'Annotation, augmentation, preprocessing and dataset curation for images, text and tabular data.' },
      { title: 'Reproducible code', description: 'Documented code, environment files and a README so you and reviewers can rerun everything.' },
    ],
    process: standardProcess,
    tools: ['Python', 'PyTorch', 'TensorFlow / Keras', 'scikit-learn', 'Hugging Face', 'Weights & Biases or TensorBoard'],
    catalogItems: [
      'ML/AI/DL Model Training',
      'GPU-Powered Experiment Execution',
      'Hyperparameter Tuning',
      'Experiment Execution & Logging',
      'Benchmarking & Model Comparison',
      'Computer Vision Solutions',
      'NLP & Text Mining',
      'Data Annotation for ML/AI',
      'Code Documentation',
      'Experimental Research Support Package (GPU Experiments, Analysis, Editing)',
    ],
    serviceType: 'Machine learning research and development',
    faqs: [
      {
        question: 'Do I own the code and results?',
        answer: 'Yes. Code, trained weights and results are delivered to you and are yours to use and publish. We don’t reuse client data or code.',
      },
      {
        question: 'Can you reproduce a model from a paper?',
        answer: 'Usually, yes. Send the paper and any public code, and we will tell you in the quote what can be reproduced with the data and compute available.',
      },
      {
        question: 'Do I need my own GPU?',
        answer: 'No. GPU time is included in the experiment price we quote. If you have institutional compute, we can also run the code there.',
      },
      {
        question: 'Will you help write up the methods?',
        answer: 'We document every experiment and explain the setup and results so you can write the methods and results sections, and we can review your draft for technical accuracy.',
      },
    ],
    relatedGuides: ['ai-in-healthcare-2026-transforming-medical-research', 'large-language-models-education-research-opportunities-2026'],
  },
  {
    slug: 'research-data-collection',
    name: 'Research Data Collection and Web Scraping',
    shortName: 'Data Collection',
    metaTitle: 'Research Data Collection & Web Scraping',
    metaDescription:
      'Collect and clean research data from websites, APIs and public datasets with Python, documented and ready for analysis.',
    icon: '🗂️',
    summary: 'Web scraping, API collection, public datasets and clean, documented data ready for analysis.',
    intro:
      'Good analysis needs good data. We collect data from websites, APIs and public repositories, clean and structure it, and document exactly how it was gathered so your data collection section is easy to write and easy to reproduce.',
    audience: [
      'Researchers building datasets from websites, social platforms or APIs',
      'Students who need public datasets found and prepared for a project',
      'Analysts who need recurring data extraction automated',
      'Teams that need a messy dataset cleaned and organised',
    ],
    included: [
      { title: 'Web scraping', description: 'Python scrapers with Scrapy, BeautifulSoup or Selenium that respect site terms and rate limits.' },
      { title: 'API collection', description: 'Data gathered from public and authenticated APIs, with keys you control.' },
      { title: 'Dataset search', description: 'Finding suitable open datasets on Kaggle, Hugging Face, government portals and research repositories.' },
      { title: 'Cleaning and structuring', description: 'De-duplication, normalisation and tidy CSV, Excel or database tables.' },
      { title: 'Documentation', description: 'A data dictionary and a description of the collection method for your methods section.' },
      { title: 'Automation', description: 'Scheduled scripts if you need the data refreshed regularly.' },
    ],
    process: standardProcess,
    tools: ['Python', 'Scrapy', 'BeautifulSoup', 'Selenium', 'pandas', 'SQL'],
    catalogItems: [
      'Web Scraping & Data Extraction',
      'Data Collection (Surveys/APIs/Public Sources)',
      'Dataset Finder Service',
      'Dataset Curation & Organization',
      'Data Entry',
      'API Development & Integration',
    ],
    serviceType: 'Research data collection and web scraping',
    faqs: [
      {
        question: 'Is web scraping allowed?',
        answer: 'It depends on the website’s terms and the data. We only collect publicly accessible data, respect robots.txt and rate limits, and flag sites or personal data that need permission or ethics approval first.',
      },
      {
        question: 'Can you collect personal data for my study?',
        answer: 'Only where you have a lawful basis and any required ethics approval. We help you minimise and anonymise personal data, and we delete our copies after delivery.',
      },
      {
        question: 'What format will I receive?',
        answer: 'CSV, Excel, JSON or a database, plus the scripts and a data dictionary so the collection can be repeated.',
      },
      {
        question: 'Can you analyse the data afterwards?',
        answer: 'Yes. Many clients combine data collection with our statistical analysis or machine learning services.',
      },
    ],
    relatedGuides: ['spss-vs-python-vs-r-best-tool-data-analysis-2026'],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

/** The service page a guide belongs to (first service that lists it) */
export function getServiceForGuide(blogSlug: string): ServicePage | undefined {
  return servicePages.find((page) => page.relatedGuides.includes(blogSlug));
}
