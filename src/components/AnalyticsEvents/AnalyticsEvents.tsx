'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

/** Where on the page a link sits, sent as the cta_location parameter */
function ctaLocation(el: Element): string {
  const tagged = el.closest('[data-cta-location]');
  if (tagged) return tagged.getAttribute('data-cta-location') || 'unknown';
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  const section = el.closest('section[id]');
  if (section) return section.id;
  return window.location.pathname;
}

/**
 * GA4 events for contact links anywhere on the site:
 *  - whatsapp_click: wa.me / api.whatsapp.com links (link_url, cta_location)
 *  - email_click: mailto links (link_url, cta_location)
 * One delegated listener, so links added later are tracked automatically.
 * (generate_lead is sent by the quote form itself on a successful submit.)
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href;
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        sendGAEvent('event', 'whatsapp_click', { link_url: href, cta_location: ctaLocation(link) });
      } else if (href.startsWith('mailto:')) {
        sendGAEvent('event', 'email_click', { link_url: href, cta_location: ctaLocation(link) });
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
