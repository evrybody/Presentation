import React, { useState, useEffect } from "react";
import { externalAuthService } from "@/services/externalAuth.service";
import { User } from "@/types/user";
import CustomAlert, { AlertProps } from "@/features/Alert/Alert";
import { currencies } from "./Registration";

import "../styles.css";

export default function GoogleCompleteRegistrationForm({
  idToken,
  onClose,
}: {
  idToken: string;
  onSuccess: (user: User) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ dateOfBirth: "", currencyCode: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const result = await externalAuthService.completeGoogleRegistration({
      idToken,
      dateOfBirth: form.dateOfBirth,
      currencyCode: form.currencyCode,
    });

    if (result?.type === "success") {
      await externalAuthService.googleLogin(idToken);
      onClose();
    } else {
      setAlert({ type: "error", message: result?.message || "Error" });
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="modal active">
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="form--complete">
          <h3>Complete Registration</h3>

          <div className="form-container">
            <div className="form-item">
              <span>Date of birth</span>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({ ...form, dateOfBirth: e.target.value })
                }
                required
              />
            </div>

            <div className="form-item">
              <span>Select currency</span>
              <select
                value={form.currencyCode}
                onChange={(e) =>
                  setForm({ ...form, currencyCode: e.target.value })
                }
                required
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Saving..." : "Complete"}
          </button>

          {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}
        </form>
      </div>
    </div>
  );
}
