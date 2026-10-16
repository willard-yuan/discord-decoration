import { onCLS, onINP, onLCP } from 'web-vitals/attribution';
let started = false;
export function startVitals(endpoint) {
  if (started || !endpoint) return;
  started = true;
  const page = location.pathname;
  const report = metric => {
    const a = metric.attribution || {};
    // No text, uploaded files, query strings, or persistent visitor identifiers.
    const payload = JSON.stringify({
      name: metric.name, value: metric.value, delta: metric.delta,
      rating: metric.rating, id: metric.id, navigationType: metric.navigationType,
      page, lang: document.documentElement.lang,
      release: import.meta.env.VITE_RELEASE || 'unknown',
      target: a.target || a.largestShiftTarget || a.interactionTarget || a.element || '',
      inputDelay: a.inputDelay, processingDuration: a.processingDuration,
      presentationDelay: a.presentationDelay, timeToFirstByte: a.timeToFirstByte,
      resourceLoadDelay: a.resourceLoadDelay, resourceLoadDuration: a.resourceLoadDuration,
      elementRenderDelay: a.elementRenderDelay,
    });
    const body = new Blob([payload], { type: 'text/plain' });
    if (!navigator.sendBeacon?.(endpoint, body)) {
      fetch(endpoint, { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  };
  onCLS(report); onINP(report); onLCP(report);
}
