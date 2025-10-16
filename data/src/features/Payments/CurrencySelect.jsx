"use client";

import React, { useState } from "react";

import styles from "./payments.module.css";

export default function CurrencySelect({ currencies }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = currencies.filter((cur) =>
    cur.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.currencySelectContainer}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={selected || "Search currency..."}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={styles.currencySelector}>
          {filtered.map((currency, index) => (
            <li
              key={index}
              onClick={() => {
                setSelected(currency);
                setSearch(currency);
                setIsOpen(false);
              }}
            >
              {currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
