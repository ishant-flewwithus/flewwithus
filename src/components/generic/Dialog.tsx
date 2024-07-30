import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const Dialog: React.FC<DialogProps> = ({ open, setOpen, children, hideCloseButton = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Toggle the body's overflow style
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Handle click outside modal to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on component unmount or when modal closes
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-2/3 rounded-lg overflow-hidden bg-white shadow-lg"
      >
        <div>
          {!hideCloseButton && (
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Dialog;
