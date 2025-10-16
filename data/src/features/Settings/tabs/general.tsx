"use client";

import React, { useState } from "react";
import useAuthStore from "@/store/Auth/authStore";
import {
  sendVerificationCode,
  writeVerificationCode,
} from "@/services/User/twoFactorAuth.service";

import CustomAlert, { AlertProps } from "@/features/Alert/Alert";
import { LineSvg } from "../settings.config";

import GoogleButton from "@/features/Google/GoogleButton";
import { connectSocials } from "@/services/User/connectSocials";

import styles from "@/features/Settings/Settings.module.css";

export function SettingsTabGeneral() {
  const { user } = useAuthStore();

  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(
    user?.isEmailConfirmed
  );

  const [cooldown, setCooldown] = useState(0);

  const handleSendCode = async () => {
    setAlert(null);
    setLoading(true);
    setCooldown(60);
    try {
      const response = await sendVerificationCode();
      if (response.type === "success") {
        setIsVerifying(true);
        setAlert({ type: "success", message: response.message });
      }
    } catch {
      setAlert({ type: "error", message: "Error sending" });
    } finally {
      setLoading(false);
    }
  };

  const handleWriteCode = async () => {
    setAlert(null);
    setLoading(true);
    try {
      const parsedCode = parseInt(code, 10);
      if (isNaN(parsedCode)) {
        setAlert({ type: "error", message: "Please enter a valid number" });
        return;
      }

      const response = await writeVerificationCode(parsedCode);

      if (response.type === "success") {
        setIsVerifying(false);
        setIsEmailConfirmed(true);
        setAlert({ type: "success", message: response.message });
      } else {
        setAlert({
          type: "error",
          message: response.message || "Invalid code",
        });
        setCode("");
      }
    } catch {
      setAlert({ type: "error", message: "Error verifying" });
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (providerId: string, idToken: string) => {
    setAlert(null);
    setLoading(true);
    try {
      const response = await connectSocials.connectSocial(providerId, idToken);
      if (response.type === "success") {
        setAlert({ type: "success", message: response.message });
      }
    } catch {
      setAlert({ type: "error", message: "Error sending" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.field}>
      {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}

      <section className={styles.section}>
        <label>Login</label>
        <span>{user?.email}</span>
      </section>

      <LineSvg />

      <section className={styles.section}>
        {!isEmailConfirmed ? (
          !isVerifying ? (
            <div className={styles.verifyContainer}>
              <p>Your email is not confirmed</p>
              <button
                className={styles.twofactorBtn}
                onClick={handleSendCode}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm your Email"}
              </button>
            </div>
          ) : (
            <form
              className={styles.verifyContainer}
              onSubmit={(e) => {
                e.preventDefault();
                handleWriteCode();
              }}
            >
              <label htmlFor="verify-code">Enter verification code</label>
              <input
                id="verify-code"
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={styles.verifyInput}
              />
              <button
                type="submit"
                disabled={loading || !code}
                className={styles.twofactorBtn}
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
              <button
                type="button"
                disabled={loading || cooldown > 0}
                className={styles.twofactorBtn}
                onClick={handleSendCode}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
              </button>
            </form>
          )
        ) : (
          <span className={styles.verifiedLabel}>✔ Email confirmed</span>
        )}
      </section>
      <LineSvg />

      <section className={styles.section}>
        <label>Connect social accounts</label>
        <div className={styles.socialLinks}>
          <GoogleButton
            action="connect"
            onSuccess={(idToken) => handleConnect("google", idToken)}
            onError={(msg) =>
              setAlert({
                type: "error",
                message: msg || "Google connection failed",
              })
            }
          />
          <button className={styles.socialBtn}>Facebook</button>
        </div>
      </section>
    </div>
  );
}
