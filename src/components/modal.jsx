import { Icons } from "./icons";
import "./modal.css";

export default function Modal(props) {
  return (
    <div
      className={`top-0 left-0 z-50 fixed flex justify-center items-center bg-black/80 w-screen h-screen select-none modal-container overflow-y-auto py-4 ${
        props.visible ? "modal-visible" : ""
      }`}
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          props.onClose?.();
        }
      }}
    >
      <div className="flex flex-col items-stretch bg-surface-high shadow-base-lower/60 shadow-sm border border-[#97979f1f] xs:rounded-xl w-screen xs:w-[420px] max-h-[90vh] min-h-[200px] xs:min-h-[200px] overflow-hidden text-white modal-box">
        <div
          className={`p-4 relative flex flex-col grow gap-4 overflow-y-auto ${
            props.glow ? "glow-bg" : ""
          }`}
        >
          {props.hideActions || (
            <button
              className="top-4 right-4 absolute opacity-50 hover:opacity-100 text-icon-tertiary transition-opacity [transition-duration:200ms] min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={props.onClose}
              aria-label={"Close modal"}
            >
              <Icons.close size="24px" />
            </button>
          )}
          {(props.title || props.subtitle) && (
            <div className="flex flex-col gap-2">
              {props.title && (
                <div className="flex justify-center">
                  <h2 className="font-semibold text-white/80 text-2xl text-center [letter-spacing:.02em]">
                    {props.title}
                  </h2>
                </div>
              )}
              {props.subtitle && (
                <div className="flex justify-center">
                  <p className="text-white/70 text-sm xs:text-base text-center">
                    {props.subtitle}
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col justify-stretch grow-1">
            {props.children}
          </div>
          {props.hideActions || (
            <>
              <div class="modal-spacer" />
              <div className="flex flex-col sm:flex-row justify-end bg-surface-high mt-4 gap-2 sm:gap-0">
                {props.secondaryText && (
                  <button
                    className="px-6 py-3 sm:py-2 rounded-lg text-white/70 text-sm hover:underline transition min-h-[44px] sm:min-h-auto flex items-center justify-center"
                    onClick={props.onClose}
                  >
                    {props.secondaryText || "Cancel"}
                  </button>
                )}

                <button
                  className="px-6 py-3 sm:py-2 text-sm button-primary min-h-[44px] sm:min-h-auto flex items-center justify-center"
                  onClick={props.onClose}
                >
                  {props.closeText || "Close"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
