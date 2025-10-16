import React, { useState } from "react";
import Modal from "./Modal";
import "./ModalButton.css";

/**
 * A button that opens a modal when clicked
 *
 * @param {Object} props - Component props
 * @param {string} props.buttonText - Text to display on the button
 * @param {string} [props.buttonClass] - Additional CSS class for the button
 * @param {React.ReactNode} props.children - Content to display in the modal
 * @param {string} [props.ariaLabel] - Accessibility label for the modal
 * @param {string} [props.modalClassName] - Additional CSS class for the modal
 * @param {string} [props.modalContentClassName] - Additional CSS class for the modal content
 * @param {boolean} [props.closeOnEsc=true] - Whether to close the modal when Escape key is pressed
 * @param {Function} [props.onOpen] - Callback function called when the modal opens
 * @param {Function} [props.onClose] - Callback function called when the modal closes
 */
export default function ModalButton({
  buttonText,
  buttonClass = "",
  children,
  ariaLabel,
  modalClassName = "",
  modalContentClassName = "",
  closeOnEsc = true,
  onOpen,
  onClose,
}) {
  const [modalActive, setModalActive] = useState(false);

  const handleClick = () => {
    const newState = !modalActive;
    setModalActive(newState);

    // Call the appropriate callback
    if (newState && onOpen) {
      onOpen();
    } else if (!newState && onClose) {
      onClose();
    }
  };

  const handleModalStateChange = (newState) => {
    setModalActive(newState);

    // Call onClose callback when modal is closed
    if (!newState && onClose) {
      onClose();
    }
  };

  return (
    <>
      <button
        className={`modal-button ${buttonClass}`}
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-expanded={modalActive}
      >
        {buttonText}
      </button>
      <Modal
        active={modalActive}
        setActive={handleModalStateChange}
        className={modalClassName}
        contentClassName={modalContentClassName}
        ariaLabel={ariaLabel || `${buttonText} dialog`}
        closeOnEsc={closeOnEsc}
      >
        {children}
      </Modal>
    </>
  );
}
