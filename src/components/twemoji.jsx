import "./twemoji.css";

const Twemoji = ({ emoji, width = 16, height = 16, className = "" }) => (
  <img
    className={`emoji ${className}`}
    draggable={false}
    src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/${emoji}.svg`}
    alt={String.fromCodePoint(parseInt(emoji, 16))}
    loading={"lazy"}
    width={width}
    height={height}
  />
);

export default Twemoji;
