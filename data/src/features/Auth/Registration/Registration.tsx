"use client";

import React, { useState } from "react";

import { authService } from "@/services/auth.service";
import useAuthStore from "@/store/Auth/authStore";
import { getCountryBlockStatus } from "@/services/User/getStatus";

import { IRegistrationArguments } from "@/types/handlers/IRegistrationArguments";

import GoogleButton from "@/features/Google/GoogleButton";
import GoogleCompleteRegistrationForm from "./CompleteRegistration";
import { externalAuthService } from "@/services/externalAuth.service";

import CustomAlert, { AlertProps } from "@/features/Alert/Alert";

import "../styles.css";

export const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "SEK", name: "Swedish Krona" },
];

export const RegistrationForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const [formData, setFormData] = useState<
    IRegistrationArguments & { confirmPassword: string }
  >({
    email: "",
    password: "",
    confirmPassword: "",
    currencyCode: "",
    name: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    currencyCode?: string;
    name?: string;
    dateOfBirth?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const login = useAuthStore((state) => state.login);
  const [incompleteIdToken, setIncompleteIdToken] = useState<string | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date < new Date();
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = "Password must be 8-20 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.name.length < 2 || formData.name.length > 16) {
      newErrors.name = "name must be 2-16 characters";
    }

    if (!formData.dateOfBirth || !validateDate(formData.dateOfBirth)) {
      newErrors.dateOfBirth = "Invalid date of birth";
    }

    if (!formData.currencyCode) {
      newErrors.currencyCode = "Please select a currency";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setAlert(null);
    setLoading(true);

    try {
      const result = await authService.registration({
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        currencyCode: formData.currencyCode,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      });

      if (result.type === "success") {
        if (result.user) {
          login(result.user);
          onSuccess();
        } else {
          const loginRes = await authService.login(
            formData.email.trim(),
            formData.password
          );
          if (loginRes.type === "success" && loginRes.user) {
            login(loginRes.user);
          }
        }
      }

      setAlert(result);
    } catch (error) {
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Network error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields: Array<{
    key: keyof typeof formData;
    type: string;
    placeholder: string;
  }> = [
    { key: "email", type: "text", placeholder: "Email" },
    { key: "name", type: "text", placeholder: "Name" },
    { key: "password", type: "password", placeholder: "Password" },
    {
      key: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
    },
    { key: "dateOfBirth", type: "date", placeholder: "Date of birth" },
  ];

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="promo__wrapper">
        <div className="promo">123</div>
      </div>
      <div className="form__wrapper">
        <h3 className="gold-gradient">Registration</h3>

        {fields.map(({ key, type, placeholder }) => (
          <div key={key} className="form-item">
            <input
              type={type}
              name={key}
              placeholder={placeholder}
              value={
                key === "dateOfBirth"
                  ? formData.dateOfBirth.split("T")[0]
                  : (formData[key] as string)
              }
              onChange={handleChange}
              className={error[key] ? "input-error" : ""}
              autoComplete={
                key === "password" || key === "confirmPassword"
                  ? "new-password"
                  : undefined
              }
            />
            {error[key] && <span className="error-message">{error[key]}</span>}
          </div>
        ))}

        <div className="form-item">
          <select
            name="currencyCode"
            value={formData.currencyCode}
            onChange={handleSelectChange}
            className={error.currencyCode ? "input-error" : ""}
          >
            <option value="">Select currency</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
          {error.currencyCode && (
            <span className="error-message">{error.currencyCode}</span>
          )}
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Processing..." : "Sign up"}
        </button>

        {/* === Соц. кнопки вынес внутрь form__wrapper, как в LoginForm === */}
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
              <li className="other__login Google">
                <GoogleButton
                  action="register"
                  onSuccess={async (idToken: string) => {
                    const result = await externalAuthService.googleRegister(
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
              <li className="other__login Facebook">
                <button className="other__login">Facebook</button>
              </li>
              <li className="other__login Twitch">
                <button className="other__login">Twitch</button>
              </li>
              <li className="other__login Steam">
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

      {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}
    </form>
  );
};

const RegistrationFormModal: React.FC = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isCheckingCountry, setIsCheckingCountry] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const handleRegistrationClick = async () => {
    setAlert(null);
    setIsCheckingCountry(true);

    try {
      const countryStatus = await getCountryBlockStatus();

      if (countryStatus.code === 200) {
        setModalActive(true);
      } else {
        setAlert({
          type: "error",
          message: countryStatus.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Failed to check country status",
      });
    } finally {
      setIsCheckingCountry(false);
    }
  };

  return (
    <div>
      {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}

      <button
        className="modal-button register"
        onClick={handleRegistrationClick}
        disabled={isCheckingCountry}
      >
        {isCheckingCountry ? "Checking..." : "Registration"}
      </button>

      {modalActive && (
        <div className="modal active" onClick={() => setModalActive(false)}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <RegistrationForm onSuccess={() => setModalActive(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationFormModal;
