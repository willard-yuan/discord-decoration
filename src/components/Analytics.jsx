import { useEffect } from "preact/hooks";

export function Analytics() {
  useEffect(() => {
    // Only load analytics in production and after user interaction
    if (typeof window === "undefined" || window.location.hostname === "localhost") {
      return;
    }

    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Create and load gtag script
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-QJ8PJQ49Y1";
      document.head.appendChild(script);

      // Initialize gtag - use bracket notation to avoid TypeScript errors
      const globalWindow = window;
      globalWindow['dataLayer'] = globalWindow['dataLayer'] || [];
      function gtag() {
        globalWindow['dataLayer'].push(arguments);
      }
      globalWindow['gtag'] = gtag;
      
      gtag("js", new Date());
      gtag("config", "G-QJ8PJQ49Y1", {
        // Optimize for performance
        send_page_view: false, // We'll send manually
        transport_type: "beacon",
        custom_map: { custom_parameter: "value" }
      });

      // Send initial page view
      gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href
      });

      // Remove event listeners after loading
      document.removeEventListener("scroll", loadAnalytics);
      document.removeEventListener("mousemove", loadAnalytics);
      document.removeEventListener("touchstart", loadAnalytics);
      document.removeEventListener("click", loadAnalytics);
    };

    // Load analytics on user interaction or after 3 seconds
    const timeoutId = setTimeout(loadAnalytics, 3000);
    
    document.addEventListener("scroll", loadAnalytics, { once: true, passive: true });
    document.addEventListener("mousemove", loadAnalytics, { once: true, passive: true });
    document.addEventListener("touchstart", loadAnalytics, { once: true, passive: true });
    document.addEventListener("click", loadAnalytics, { once: true, passive: true });

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("scroll", loadAnalytics);
      document.removeEventListener("mousemove", loadAnalytics);
      document.removeEventListener("touchstart", loadAnalytics);
      document.removeEventListener("click", loadAnalytics);
    };
  }, []);

  return null;
}