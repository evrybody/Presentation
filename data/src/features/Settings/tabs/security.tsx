"use client";

import React, { useState } from "react";
import { resetName, resetPassword } from "@/services/User/resetData";
import CustomAlert, { AlertProps } from "@/features/Alert/Alert";
import { LineSvg } from "../settings.config";

import styles from "@/features/Settings/Settings.module.css";

export function SettingsTabSecurity() {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className={styles.securityContainer}>
      {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}

      {/* Смена имени */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Change Name</h3>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            setAlert(null);

            if (!newName || newName.length < 2 || newName.length > 16) {
              setAlert({
                type: "error",
                message: "Name must be between 2 and 16 characters",
              });
              return;
            }

            setLoading(true);
            try {
              const response = await resetName(newName);
              setAlert(response);
              if (response.type === "success") setNewName("");
            } finally {
              setLoading(false);
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={loading || !newName}
            className={styles.actionBtn}
          >
            {loading ? "Updating..." : "Change Name"}
          </button>
        </form>
      </section>

      <LineSvg />

      {/* Смена пароля */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Change Password</h3>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            setAlert(null);

            if (!newPassword || !confirmPassword || !oldPassword) {
              setAlert({
                type: "error",
                message: "All fields are required",
              });
              return;
            }
            if (
              oldPassword.length < 8 ||
              oldPassword.length > 20 ||
              newPassword.length < 8 ||
              newPassword.length > 20
            ) {
              setAlert({
                type: "error",
                message: "Password must be 8–20 characters",
              });
              return;
            }
            if (newPassword !== confirmPassword) {
              setAlert({ type: "error", message: "Passwords do not match" });
              return;
            }

            setLoading(true);
            try {
              const response = await resetPassword(newPassword, oldPassword);
              setAlert(response);
              if (response.type === "success") {
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className={styles.passwordGroup}>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.passwordGroup}>
            <input
              type="password"
              placeholder="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="submit"
              disabled={
                loading || !newPassword || !confirmPassword || !oldPassword
              }
              className={styles.actionBtn}
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
