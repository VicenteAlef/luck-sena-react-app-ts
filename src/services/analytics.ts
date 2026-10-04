export type CookieConsentStatus = 'accepted' | 'essential' | null;

const COOKIE_STORAGE_KEY = 'lucksena_cookie_consent';
const DEFAULT_GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-LUCKSENA26';

let isGaInitialized = false;

// Interface para estender o Window com datalayer e gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getCookieConsent(): CookieConsentStatus {
  try {
    const val = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (val === 'accepted' || val === 'essential') {
      return val;
    }
  } catch {
    // Falha silenciosa
  }
  return null;
}

export function setCookieConsent(status: 'accepted' | 'essential'): void {
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, status);
  } catch {
    // Falha silenciosa
  }

  if (status === 'accepted') {
    initGoogleAnalytics();
  }
}

export function initGoogleAnalytics(measurementId = DEFAULT_GA_ID): void {
  if (typeof window === 'undefined' || isGaInitialized) return;
  if (getCookieConsent() !== 'accepted') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: false, // Gerenciado manualmente pelo router
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    isGaInitialized = true;
    console.info(`[Analytics] Google Analytics inicializado (${measurementId})`);
  } catch (err) {
    console.warn('[Analytics] Falha ao inicializar Google Analytics:', err);
  }
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (getCookieConsent() !== 'accepted') return;

  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar pageview:', err);
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (getCookieConsent() !== 'accepted') return;

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar evento:', err);
  }
}
