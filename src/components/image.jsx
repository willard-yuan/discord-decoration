const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

export default function Image(props) {
  const getDefaultAlt = () => {
    if (props.id === 'avatar') return 'Discord avatar preview';
    if (props.id === 'decoration') return 'Discord avatar decoration';
    if (props.src && props.src.includes('avatar')) return 'Discord avatar';
    if (props.src && props.src.includes('decoration')) return 'Discord decoration';
    return props.alt || 'Discord decoration image';
  };

  return (
    <>
      {props.src !== "" && (
        <img
          {...props}
          alt={props.alt || getDefaultAlt()}
          src={
            props.src.startsWith("http") || props.src.startsWith("data:")
              ? props.src
              : `${baseImgUrl}${props.src}`
          }
          loading="lazy"
        />
      )}
    </>
  );
}
