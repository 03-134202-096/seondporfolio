/**
 * =====================================================
 * Site-wide business details — single source of truth
 * =====================================================
 *
 * Name, contact details and address must be identical everywhere
 * (pages, footer, structured data, directory listings). Change them here only.
 */

export const SITE = {
  name: 'DeepDivers',
  url: 'https://deepdivers.services',

  /** Public contact email (also receives every website inquiry) */
  email: 'teamdeepdivers@gmail.com',

  /** WhatsApp number, display form and wa.me form */
  phoneDisplay: '+92 312 5065538',
  phoneE164: '+923125065538',
  whatsappNumber: '923125065538',

  /** Office location as confirmed by the owner (no street address published) */
  address: {
    display: 'G-13, Islamabad, Pakistan',
    locality: 'Islamabad',
    region: 'Islamabad Capital Territory',
    countryCode: 'PK',
    sector: 'Sector G-13',
  },

  /** Square logo used in structured data (512 x 512) */
  logo: '/logo-512.png',
  ogImage: '/og-image.png',

  /** Verified public profiles. Add each social profile here as it goes live. */
  sameAs: [
    'https://www.linkedin.com/company/deepdivers-services/',
    'https://www.youtube.com/@teamdeepdivers',
  ] as string[],

  social: {
    linkedin: 'https://www.linkedin.com/company/deepdivers-services/',
    youtube: 'https://www.youtube.com/@teamdeepdivers',
  },

  founder: {
    name: 'Asad Farooq',
    url: 'https://deepdivers.services/about',
    orcid: 'https://orcid.org/0009-0005-5090-159X',
    scholar: 'https://scholar.google.com/citations?user=4TMJnYEAAAAJ',
    github: 'https://github.com/03-134202-096',
  },
} as const;

/** Builds a wa.me link with an optional prefilled message */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Gmail compose link for the public email (opens in a new tab on desktop) */
export const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`;

/** schema.org PostalAddress for the office */
export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.sector,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.countryCode,
};

/** schema.org Person for the founder, used as the author of guides */
export const founderPerson = {
  '@type': 'Person',
  '@id': `${SITE.url}/about#asad-farooq`,
  name: SITE.founder.name,
  url: SITE.founder.url,
  jobTitle: 'Founder & Lead Researcher',
  worksFor: { '@id': `${SITE.url}/#organization` },
  sameAs: [SITE.founder.orcid, SITE.founder.scholar, SITE.founder.github],
};
