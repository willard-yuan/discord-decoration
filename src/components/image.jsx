import { useEffect, useRef, useState } from 'preact/hooks';

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";
const TRANSPARENT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRA==";

export default function Image(props) {
  const getDefaultAlt = () => {
    if (props.id === 'avatar') return 'Discord avatar preview';
    if (props.id === 'decoration') return 'Discord avatar decoration';
    if (props.src && props.src.includes('avatar')) return 'Discord avatar';
    if (props.src && props.src.includes('decoration')) return 'Discord decoration';
    return props.alt || 'Discord decoration image';
  };

  const { onClick, onKeyDown, className, style, ...imgProps } = props;

  const containerRef = useRef(null);
  const [inView, setInView] = useState(Boolean(props.loading === 'eager'));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (inView) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && (entry.isIntersecting || entry.intersectionRatio > 0)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  const resolveSrc = () => {
    const src = props.src || '';
    const final = src.startsWith('http') || src.startsWith('data:')
      ? src
      : `${baseImgUrl}${src}`;
    return inView ? final : (props.placeholderSrc || TRANSPARENT_PLACEHOLDER);
  };

  const imgNode = (
    <img
      {...imgProps}
      alt={props.alt || getDefaultAlt()}
      src={resolveSrc()}
      loading={props.loading || 'lazy'}
      onLoad={() => setLoaded(true)}
      className={`${className || ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={style}
    />
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(e);
    }
    if (props.onKeyDown) props.onKeyDown(e);
  };

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      {props.src !== '' && (
        onClick ? (
          <button
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-primary border-0 bg-transparent p-0`}
            aria-label={props.alt || getDefaultAlt()}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
            style={{ display: 'inline-block' }}
          >
            {imgNode}
          </button>
        ) : (
          imgNode
        )
      )}
    </div>
  );
}
