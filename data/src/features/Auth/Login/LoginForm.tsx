import React, { useState } from "react";

import { ILoginArguments } from "@/types/handlers/ILoginArguments";

import { authService } from "@/services/auth.service";

import { useAuthStore } from "@/store/Auth/authStore";

import CustomAlert from "@/features/Alert/Alert";

import GoogleButton from "@/features/Google/GoogleButton";
import GoogleCompleteRegistrationForm from "@/features/Auth/Registration/CompleteRegistration";
import { externalAuthService } from "@/services/externalAuth.service";

import { AlertProps } from "@/features/Alert/Alert";

import "../styles.css";

export const LoginForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ILoginArguments>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [incompleteIdToken, setIncompleteIdToken] = useState<string | null>(
    null
  );

  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = "Password must be 8-20 characters";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert(null);

    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );

      setAlert({
        type: response?.type,
        message: response?.message,
      });

      if (response?.type === "success" && response.user) {
        login(response.user);
        setFormData({
          email: "",
          password: "",
        });
        onSuccess();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlert({ type: "error", message: error.message });
      } else {
        setAlert({ type: "error", message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="promo__wrapper">
        <div className="promo">123</div>
      </div>
      <div className="form__wrapper">
        <h3 className="gold-gradient">Authorization</h3>

        {/* Email */}
        <div className="form-item">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={error.email ? "input-error" : ""}
          />
          {error.email && <span className="error-message">{error.email}</span>}
        </div>

        {/* Password */}
        <div className="form-item">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={error.password ? "input-error" : ""}
          />
          {error.password && (
            <span className="error-message">{error.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <div className="other__login__wrapper">
          <svg
            width="100%"
            height="4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3H1828"
              stroke="url(#paint0_linear_286_106)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_286_106"
                x1="0%"
                y1="1"
                x2="100%"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FED253" stopOpacity="0" />
                <stop offset="0.25" stopColor="#FED253" />
                <stop offset="0.50" stopColor="#F4E0AD" />
                <stop offset="0.75" stopColor="#FED253" />
                <stop offset="1" stopColor="#FED253" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="or">
            <ul>
              <li className="other__login  Google">
                <GoogleButton
                  action="login"
                  onSuccess={async (idToken: string) => {
                    const result = await externalAuthService.googleLogin(
                      idToken
                    );

                    if (result?.type === "success") {
                      onSuccess();
                    } else if (result?.type === "incomplited") {
                      setIncompleteIdToken(idToken);
                    } else {
                      setAlert({
                        type: "error",
                        message: "Error",
                      });
                    }
                  }}
                  // onError={(msg) => console.error(msg)} //to do rework
                />
              </li>
              <li className="other__login  Facebook">
                <button className="other__login">Facebook</button>
              </li>
              <li className="other__login  Twitch">
                <button className="other__login">Twitch</button>
              </li>
              <li className="other__login  Steam">
                <button className="other__login">Steam</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {incompleteIdToken && (
        <GoogleCompleteRegistrationForm
          idToken={incompleteIdToken}
          onSuccess={() => {
            setIncompleteIdToken(null);
            onSuccess();
          }}
          onClose={() => setIncompleteIdToken(null)}
        />
      )}

      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </form>
  );
};

const LoginFormModal: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <button
        className="modal-button login"
        onClick={() => setModalActive(true)}
      >
        Login
      </button>

      {modalActive && (
        <div className="modal active" onClick={() => setModalActive(false)}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <LoginForm onSuccess={() => setModalActive(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginFormModal;
