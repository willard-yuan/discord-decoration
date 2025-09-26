export const NeutralButton = ({ children, onClick, ariaLabel, disabled }) => {
  const buttonProps = {
    className: "flex justify-center items-center gap-1.5 mt-3 py-1.5 button-secondary",
    onClick: onClick,
  };

  if (ariaLabel) {
    buttonProps['aria-label'] = ariaLabel;
  }

  if (disabled !== undefined) {
    buttonProps.disabled = disabled;
  }

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
};
