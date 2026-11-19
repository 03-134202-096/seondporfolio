/**
 * Public DeepDivers profiles, in display order.
 * Add a profile here when it goes live: the footer icons, the contact section
 * and the Organization sameAs structured data all read this list.
 */

export type SocialNetwork = 'linkedin' | 'youtube' | 'tiktok' | 'facebook' | 'instagram' | 'x';

export interface SocialProfile {
  network: SocialNetwork;
  label: string;
  url: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { network: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/deepdivers-services/' },
  // Facebook page has no custom username yet; update this URL if one is set
  { network: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61596931820956' },
  { network: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/deepdivers.services/' },
  { network: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@teamdeepdivers' },
  { network: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@teamdeepdivers' },
];

/**
 * Business directory listings. These go in the Organization sameAs only (no icons).
 * Add a listing once the directory has approved and published it.
 */
export const DIRECTORY_PROFILES: string[] = [
  'https://www.crunchbase.com/organization/deepdivers',
];
