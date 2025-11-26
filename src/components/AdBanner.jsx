import { useEffect, useRef } from "preact/hooks";

export default function AdBanner({ slot = "9996208852" }) {
  const slotRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const ads = window.adsbygoogle || [];
      ads.push({});
      window.adsbygoogle = ads;
    } catch (e) {
      console.error("AdSense error:", e);
    }
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
