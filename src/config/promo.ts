/**
 * =====================================================
 * 🎉 PROMO CONFIGURATION — Edit this before deployment
 * =====================================================
 *
 * How to use:
 * 1. Set PROMO_START_DATE to the date you deploy (or any future date).
 * 2. Set PROMO_DURATION_DAYS to how many days the promo lasts.
 * 3. Set DISCOUNT_PERCENT to the discount percentage (e.g. 30 = 30% off).
 * 4. The countdown timer will auto-calculate and display across the site.
 * 5. Once the promo expires, all prices revert to original automatically.
 *
 * To disable the promo entirely, set PROMO_ENABLED to false.
 */

export const PROMO_CONFIG = {
  /** Master switch — set to false to instantly disable all promo features */
  PROMO_ENABLED: false,

  /** The exact date & time the promo starts (ISO format, UTC) */
  PROMO_START_DATE: '2026-02-10T00:00:00Z',

  /** Duration in days from the start date */
  PROMO_DURATION_DAYS: 15,

  /** Discount percentage (e.g., 30 means 30% off) */
  DISCOUNT_PERCENT: 30,

  /** Promo label shown in banners and badges */
  PROMO_LABEL: '🚀 Launch Offer',

  /** Short promo message for the banner */
  PROMO_MESSAGE: 'Get {discount}% off all services — Limited time launch offer!',
} as const;

/**
 * Returns whether the promo is currently active based on config + current time.
 */
export function isPromoActive(): boolean {
  if (!PROMO_CONFIG.PROMO_ENABLED) return false;

  const now = new Date();
  const start = new Date(PROMO_CONFIG.PROMO_START_DATE);
  const end = new Date(start.getTime() + PROMO_CONFIG.PROMO_DURATION_DAYS * 24 * 60 * 60 * 1000);

  return now >= start && now < end;
}

/**
 * Returns the promo end date.
 */
export function getPromoEndDate(): Date {
  const start = new Date(PROMO_CONFIG.PROMO_START_DATE);
  return new Date(start.getTime() + PROMO_CONFIG.PROMO_DURATION_DAYS * 24 * 60 * 60 * 1000);
}

/**
 * Returns the remaining time until promo ends as { days, hours, minutes, seconds }.
 * Returns null if promo is not active.
 */
export function getPromoTimeRemaining(): { days: number; hours: number; minutes: number; seconds: number } | null {
  if (!isPromoActive()) return null;

  const now = new Date();
  const end = getPromoEndDate();
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

/**
 * Calculates the discounted price from a "From $XX" string.
 * Returns { original: string, discounted: string } or null if promo inactive.
 */
export function getDiscountedPrice(priceString: string): { original: string; discounted: string } | null {
  if (!isPromoActive()) return null;

  const match = priceString.match(/\$(\d+)/);
  if (!match) return null;

  const originalPrice = parseInt(match[1], 10);
  const discountedPrice = Math.round(originalPrice * (1 - PROMO_CONFIG.DISCOUNT_PERCENT / 100));

  return {
    original: `$${originalPrice}`,
    discounted: `$${discountedPrice}`,
  };
}
