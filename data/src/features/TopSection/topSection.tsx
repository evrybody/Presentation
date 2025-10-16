"use client";

import React from "react";
import "./topSection.css";

interface SectionData {
  caption: string;
  description: string;
}

const TopSection: React.FC<SectionData> = ({ caption, description }) => {
  return (
    <div className="section">
      <div className="section-caption">
        <h1 className="gold-gradient">{caption}</h1>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
};

export default TopSection;
