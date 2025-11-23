import { useEffect, useRef } from "preact/hooks";

const CLIENT_ID = "ca-pub-4184498324686509";

export function AdsenseResponsive({ slot, className = "", style = {} }) {
  const ref = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || pushedRef.current) return;
    let ro = null;
    const tryInit = () => {
      if (!ref.current || pushedRef.current) return;
      const w = ref.current.getBoundingClientRect().width || ref.current.offsetWidth || 0;
      const visible = w > 0 && getComputedStyle(ref.current).display !== "none";
      if (!visible) return;
      try {
        // eslint-disable-next-line no-undef
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
        if (ro) ro.disconnect();
      } catch (_) {}
    };
    tryInit();
    if (!pushedRef.current) {
      try {
        ro = new ResizeObserver(() => tryInit());
        ro.observe(ref.current);
      } catch (_) {}
      const id = setTimeout(tryInit, 600);
      return () => {
        clearTimeout(id);
        if (ro) ro.disconnect();
      };
    }
  }, []);

  return (
    <div className={`adsense-responsive ${className}`} style={{ maxWidth: "100%", overflow: "visible", ...style }}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: 80 }}
        data-ad-client={CLIENT_ID}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdsenseSidebar({ slot, className = "", style = {} }) {
  const ref = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || pushedRef.current) return;
    let ro = null;
    const tryInit = () => {
      if (!ref.current || pushedRef.current) return;
      const w = ref.current.getBoundingClientRect().width || ref.current.offsetWidth || 0;
      const visible = w > 0 && getComputedStyle(ref.current).display !== "none";
      if (!visible) return;
      try {
        // eslint-disable-next-line no-undef
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
        if (ro) ro.disconnect();
      } catch (_) {}
    };
    tryInit();
    if (!pushedRef.current) {
      try {
        ro = new ResizeObserver(() => tryInit());
        ro.observe(ref.current);
      } catch (_) {}
      const id = setTimeout(tryInit, 600);
      return () => {
        clearTimeout(id);
        if (ro) ro.disconnect();
      };
    }
  }, []);

  return (
    <div
      className={`hidden lg:block fixed right-6 top-24 z-40 ${className}`}
      style={{ width: 300, ...style }}
      aria-hidden={false}
    >
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: 300, minHeight: 250 }}
        data-ad-client={CLIENT_ID}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format="auto"
      />
    </div>
  );
}
