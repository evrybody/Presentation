"use client";

import React, { useState } from "react";

const Input = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-container">
      <input
        required
        type="text"
        name="text"
        className="input"
        aria-label="Find your game"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      />
      <label className={`label ${isFocused ? "hidden" : ""}`}>
        Find your game
      </label>
      <style>{`
        .input-container {
          flex-direction: column;
          gap: 7px;
          position: relative;
          color: #f0cb6c;
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: none;
          border-radius: 7px;
          width: 50%;
        }

        .label {
          font-size: 14px;
          padding-left: 10px;
          position: absolute;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .hidden {
          opacity: 0;
        }

        .input {
          width: 100%;
          height: 30px;
          border: 2px solid #ffcf43;
          outline: none;
          padding: 0px 7px;
          border-radius: 7px;
          color: #fff;
          font-size: 15px;
          background-color: transparent;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 1),
            -1px -1px 6px rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 1200px) {


          @media (max-width: 992px) {
          }

          @media (max-width: 768px) {
            .input-container {
              width: 20%;
            }
            .label {
              font-size: 12px;
            }
          }

          @media (max-width: 576px) {
            .input-container {
              display: none;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Input;
