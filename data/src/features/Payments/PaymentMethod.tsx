"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { AlertProps } from "../Alert/Alert";
import CustomAlert from "../Alert/Alert";

import { cryptoService } from "@/services/Payments/Crypto/cryptopayment.service";
import { getCryptoCurrencies } from "@/services/Payments/Crypto/getcurrencies.service";
import { getPaymentSystemStatus } from "@/services/Payments/Crypto/getstatus.service";

import CurrencySelect from "./CurrencySelect";
import Loading from "@/app/loading";

import styles from "./payments.module.css";

interface PaymentMethodData {
  id: string;
  name: string;
}

const STATIC_METHODS: PaymentMethodData[] = [
  { id: "pm1", name: "NowPayments" },
  // { id: "pm2", name: "MoonPay" },
  // { id: "pm3", name: "Stripe" },
];

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("pm1");
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState<string>();
  const [cryptoCurrency, setCryptoCurrency] = useState<string>("BTC");
  const [processing, setProcessing] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [paymentSystemAvailable, setPaymentSystemAvailable] = useState<
    boolean | null
  >(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentSystemStatus = async () => {
      setIsLoading(true);
      try {
        const isAvailable = await getPaymentSystemStatus();
        setPaymentSystemAvailable(isAvailable ?? false);
      } catch (error: unknown) {
        setPaymentSystemAvailable(false);
        setAlert({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Error checking payment system status.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentSystemStatus();
  }, []);

  useEffect(() => {
    if (paymentSystemAvailable && selectedMethod === "pm1") {
      const fetchCryptoCurrencies = async () => {
        try {
          const currencies = await getCryptoCurrencies();
          setCurrencies(currencies || []);
          if (currencies.length > 0 && !currencies.includes("BTC")) {
            setCryptoCurrency(currencies[0]);
          }
        } catch {
          setAlert({
            type: "error",
            message: "Failed to load cryptocurrencies",
          });
        }
      };

      fetchCryptoCurrencies();
    } else {
      setCurrencies([]);
    }
  }, [paymentSystemAvailable, selectedMethod]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!amount || parseFloat(amount) <= 0) {
      setAlert({ type: "error", message: "Please enter a valid amount." });
      return;
    }

    if (!cryptoCurrency) {
      setAlert({ type: "error", message: "Please select a cryptocurrency." });
      return;
    }

    setProcessing(true);

    try {
      const response = await cryptoService.createCryptoPay({
        amount: parseFloat(amount),
        currency: cryptoCurrency,
        successUrl: "https://testgtest.rest",
        cancelUrl: "https://testgtest.rest",
        setAlert,
      });

      if (response.paymentLink) {
        setPaymentLink(response.paymentLink);
        window.open(response.paymentLink, "_blank", "noopener,noreferrer");
      }
    } catch (error: unknown) {
      setAlert({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={styles.paymentMethod}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h3>Select Payment Method</h3>
          <div className={styles.methodList}>
            {STATIC_METHODS.map((method) => (
              <button
                key={method.id}
                className={`${styles.methodButton} ${
                  selectedMethod === method.id ? styles.active : ""
                }`}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setAmount("");
                  setCryptoCurrency("BTC");
                  setAlert(null);
                }}
              >
                {method.name}
              </button>
            ))}
          </div>

          {paymentSystemAvailable === false && (
            <div className={styles.alert}>
              Payment system is not available at the moment. Please try again
              later.
            </div>
          )}

          {selectedMethod === "pm1" && paymentSystemAvailable && (
            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
              <div>
                <label htmlFor="amount">Amount in USDT:</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={styles.amountInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="cryptoCurrency">Cryptocurrency:</label>
                {/* <select
                  id="cryptoCurrency"
                  value={cryptoCurrency}
                  onChange={(e) => setCryptoCurrency(e.target.value)}
                  disabled={currencies.length === 0}
                >
                  {currencies.length === 0 ? (
                    <option value="">Loading currencies...</option>
                  ) : (
                    currencies.map((currency, index) => (
                      <option key={index} value={currency}>
                        {currency}
                      </option>
                    ))
                  )}
                </select> */}
                <CurrencySelect currencies={currencies} />
              </div>
              <button
                type="submit"
                disabled={processing || currencies.length === 0}
              >
                {processing ? <Loading /> : "Proceed to Payment"}
              </button>
              {paymentLink && (
                <div>
                  <span>
                    <br />
                    You are being redirected to the payment gateway.
                    <br />
                    If the redirection does not happen automatically, please
                    <br />
                    click the link:{" "}
                  </span>
                  <Link
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.paymentLink}
                  >
                    Continue to Payment
                  </Link>
                </div>
              )}
            </form>
          )}

          {alert && (
            <CustomAlert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentMethod;
