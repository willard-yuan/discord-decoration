const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

export default function Image(props) {
  const getDefaultAlt = () => {
    if (props.id === 'avatar') return 'Discord avatar preview';
    if (props.id === 'decoration') return 'Discord avatar decoration';
    if (props.src && props.src.includes('avatar')) return 'Discord avatar';
    if (props.src && props.src.includes('decoration')) return 'Discord decoration';
    return props.alt || 'Discord decoration image';
  };

  const { onClick, onKeyDown, width, height, ...imgProps } = props;
  const src = props.src || "";
  const isExternal = src.startsWith("http") || src.startsWith("data:");
  const finalSrc = isExternal ? src : `${baseImgUrl}${src}`;

  // Check if we should try to load a WebP version
  // Only for local images that are PNG or JPEG
  const shouldTryWebP = !isExternal && /\.(png|jpe?g)$/i.test(src);
  const webpSrc = shouldTryWebP ? finalSrc.replace(/\.(png|jpe?g)$/i, ".webp") : null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(e);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const imgElement = (
    <img
      {...imgProps}
      alt={props.alt || getDefaultAlt()}
      src={finalSrc}
      loading="lazy"
      width={width}
      height={height}
    />
  );

  const imageElement = shouldTryWebP ? (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      {imgElement}
    </picture>
  ) : (
    imgElement
  );

  return (
    <>
      {src !== "" && (
        onClick ? (
          <button
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`${props.className || ''} focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-surface-primary border-0 bg-transparent p-0`}
            style={{ display: 'inline-block' }}
            aria-label={props.alt || getDefaultAlt()}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
          >
            {imageElement}
          </button>
        ) : (
          imageElement
        )
      )}
    </>
  );
}
