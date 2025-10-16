"use client";

import React, { useEffect, useRef } from "react";

import "./Modal.css";

/**
 * Modal component with accessibility features
 * @param {Object} props - Component props
 * @param {boolean} props.active - Whether the modal is visible
 * @param {Function} props.setActive - Function to control modal visibility
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.className] - Additional class name for the modal
 * @param {string} [props.contentClassName] - Additional class name for the modal content
 * @param {string} [props.ariaLabel] - Aria label for the modal
 * @param {boolean} [props.closeOnEsc=true] - Whether to close the modal when Escape key is pressed
 */
const Modal = ({
  active,
  setActive,
  children,
  className = "",
  contentClassName = "",
  ariaLabel = "Modal dialog",
  closeOnEsc = true,
}) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && active && closeOnEsc) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      if (modalContentRef.current) {
        modalContentRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [active, closeOnEsc, setActive]);

  if (!active) return null;

  return (
    <div
      className={`modal ${active ? "active" : ""} ${className}`}
      onClick={() => setActive(false)}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        ref={modalContentRef}
        className={`modal_content ${
          active ? "active" : ""
        } ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="modal_header">
          <div />
          <button
            className="modal_close"
            onClick={() => setActive(false)}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="modal_close_icon"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
