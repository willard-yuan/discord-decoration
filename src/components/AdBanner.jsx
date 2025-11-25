import { useEffect, useRef } from "preact/hooks";

const scriptSrc = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4184498324686509";

export default function AdBanner({ slot = "9996208852" }) {
  const slotRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasScript = Array.from(document.scripts).some((s) => s.src === scriptSrc);
    let ro = null;
    let io = null;
    const tryPush = () => {
      const el = slotRef.current;
      if (!el) return;
      const w = el.offsetWidth || el.clientWidth || 0;
      if (w > 0) {
        const ads = (typeof window !== "undefined" && Array.isArray(window.adsbygoogle)) ? window.adsbygoogle : [];
        ads.push({});
        // @ts-ignore
        window.adsbygoogle = ads;
        if (ro) ro.disconnect();
        if (io) io.disconnect();
      }
    };
    if (slotRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => tryPush());
      ro.observe(slotRef.current);
    }
    if (slotRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) tryPush();
      });
      io.observe(slotRef.current);
    }
    if (!hasScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = tryPush;
      document.head.appendChild(script);
    } else {
      tryPush();
    }
    return () => {
      if (ro) ro.disconnect();
      if (io) io.disconnect();
    };
  }, []);
  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-[900px]">
        <ins
          ref={slotRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", margin: "0 auto" }}
          data-ad-client="ca-pub-4184498324686509"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
