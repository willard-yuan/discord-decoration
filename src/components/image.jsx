const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

export default function Image(props) {
  const getDefaultAlt = () => {
    if (props.id === 'avatar') return 'Discord avatar preview';
    if (props.id === 'decoration') return 'Discord avatar decoration';
    if (props.src && props.src.includes('avatar')) return 'Discord avatar';
    if (props.src && props.src.includes('decoration')) return 'Discord decoration';
    return props.alt || 'Discord decoration image';
  };

  const { onClick, onKeyDown, ...imgProps } = props;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(e);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const imageElement = (
    <img
      {...imgProps}
      alt={props.alt || getDefaultAlt()}
      src={
        props.src.startsWith("http") || props.src.startsWith("data:")
          ? props.src
          : `${baseImgUrl}${props.src}`
      }
      loading="lazy"
    />
  );

  return (
    <>
      {props.src !== "" && (
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
