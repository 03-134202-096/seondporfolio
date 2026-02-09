'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Portfolio.module.css';

type Category = 'all' | 'visualization' | 'diagrams' | 'research';

interface PortfolioItem {
  id: string;
  src: string;
  title: string;
  category: Category;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    src: '/ConfusionMatrix.webp',
    title: 'Confusion Matrix Analysis',
    category: 'visualization',
    description: 'ML model performance evaluation visualization',
  },
  {
    id: '2',
    src: '/DataVisualization.webp',
    title: 'Data Visualization',
    category: 'visualization',
    description: 'Comprehensive data analysis charts',
  },
  {
    id: '3',
    src: '/ArchitectureDiagram.webp',
    title: 'Architecture Diagram',
    category: 'diagrams',
    description: 'Neural network architecture design',
  },
  {
    id: '4',
    src: '/Architecture2.webp',
    title: 'System Architecture',
    category: 'diagrams',
    description: 'Deep learning model architecture',
  },
  {
    id: '5',
    src: '/LearningCurves.webp',
    title: 'Learning Curves',
    category: 'visualization',
    description: 'Model training performance tracking',
  },
  {
    id: '6',
    src: '/heatmapdata.webp',
    title: 'Heatmap Analysis',
    category: 'visualization',
    description: 'Correlation and pattern visualization',
  },
  {
    id: '7',
    src: '/boxplot.webp',
    title: 'Statistical Box Plot',
    category: 'visualization',
    description: 'Data distribution analysis',
  },
  {
    id: '8',
    src: '/t-SNE-visualization.webp',
    title: 't-SNE Visualization',
    category: 'visualization',
    description: 'High-dimensional data embedding',
  },
  {
    id: '9',
    src: '/PaperFlowDiagram.webp',
    title: 'Research Flow Diagram',
    category: 'research',
    description: 'Systematic review methodology',
  },
  {
    id: '10',
    src: '/SelectionCateria.webp',
    title: 'Selection Criteria',
    category: 'research',
    description: 'Study inclusion/exclusion framework',
  },
  {
    id: '11',
    src: '/CancerGrowthVisualization.webp',
    title: 'Cancer Growth Visualization',
    category: 'visualization',
    description: 'Medical data visualization',
  },
  {
    id: '12',
    src: '/Segmentation.webp',
    title: 'Image Segmentation',
    category: 'visualization',
    description: 'Medical image processing output',
  },
  {
    id: '13',
    src: '/publicationTrends.webp',
    title: 'Publication Trends',
    category: 'research',
    description: 'Literature analysis timeline',
  },
  {
    id: '14',
    src: '/samplesize.webp',
    title: 'Sample Size Analysis',
    category: 'research',
    description: 'Statistical sample distribution',
  },
  {
    id: '15',
    src: '/pi-chart.webp',
    title: 'Distribution Chart',
    category: 'visualization',
    description: 'Data proportion visualization',
  },
  {
    id: '16',
    src: '/trans.webp',
    title: 'Transformer Architecture',
    category: 'diagrams',
    description: 'Attention mechanism diagram',
  },
];

const tabs: { label: string; value: Category }[] = [
  { label: 'All Work', value: 'all' },
  { label: 'Visualizations', value: 'visualization' },
  { label: 'Architecture Diagrams', value: 'diagrams' },
  { label: 'Research Graphics', value: 'research' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeTab === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeTab);

  return (
    <div className={`section ${styles.portfolio}`}>
      <div className="container">
        <div className={styles.portfolioTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.portfolioTab} ${
                activeTab === tab.value ? styles.portfolioTabActive : ''
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.portfolioGrid}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={styles.portfolioItem}
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className={styles.portfolioImage}
                loading="lazy"
              />
              <div className={styles.portfolioOverlay}>
                <h4 className={styles.portfolioItemTitle}>{item.title}</h4>
                <p className={styles.portfolioItemCategory}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1200}
              height={800}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <h4>{lightbox.title}</h4>
              <p>{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
