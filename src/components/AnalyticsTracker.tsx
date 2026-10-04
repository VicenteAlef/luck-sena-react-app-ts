import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initGoogleAnalytics,
  trackPageView,
  getCookieConsent,
} from '../services/analytics';

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializa se o usuário já tiver aceito cookies anteriormente
    if (getCookieConsent() === 'accepted') {
      initGoogleAnalytics();
    }
  }, []);

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    trackPageView(fullPath, document.title);
  }, [location]);

  return null;
};
