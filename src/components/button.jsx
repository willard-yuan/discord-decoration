export const NeutralButton = ({ children, onClick, ariaLabel, disabled, className, href }) => {
  const props = {
    className: `flex justify-center items-center gap-1.5 mt-3 py-1.5 button-secondary${className ? ` ${className}` : ""}`,
    onClick: onClick,
  };

  if (ariaLabel) {
    props['aria-label'] = ariaLabel;
  }

  // When the action navigates somewhere, render a real <a href> so crawlers can
  // discover the destination. onClick may still store data or preventDefault
  // for async work before handing off to the router.
  if (href) return <a href={href} {...props}>{children}</a>;

  if (disabled !== undefined) {
    props.disabled = disabled;
  }

  return (
    <button {...props}>
      {children}
    </button>
  );
};
