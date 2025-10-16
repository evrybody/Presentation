"use client";

import { FC } from "react";
import React, { useState, useEffect } from "react";
import "./Alert.css";

export interface AlertProps {
  message: string;
  type: "success" | "info" | "warning" | "error";
  onClose?: () => void;
}

const CustomAlert: FC<AlertProps> = ({ message, type, onClose }) => {
  const alertStyles = `alert alert--${type}`;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="alert__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12l2 2 4-4M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="alert__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="alert__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="alert__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    visible && (
      <div className={`alert ${alertStyles}`}>
        {getIcon()}
        <p className="alert__message">{message}</p>
        {onClose && (
          <button onClick={onClose} className="alert__close">
            &times;
          </button>
        )}
        <div className="alert__progress-bar"></div>
      </div>
    )
  );
};

export default CustomAlert;
