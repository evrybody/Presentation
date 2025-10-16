"use client";

import React from "react";

import { GoogleLogin } from "@react-oauth/google";

type GoogleAction = "login" | "register" | "connect";

type Props = {
  action: GoogleAction;
  onSuccess?: (idToken: string) => void;
  onError?: (reason: string) => void;
};

export default function GoogleButton({ action, onSuccess, onError }: Props) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const idToken = credentialResponse.credential;
        if (!idToken) {
          return onError?.("No credential received");
        }

        onSuccess?.(idToken);
      }}
      onError={() => onError?.(`Google ${action} failed`)}
      useOneTap={action === "login"}
      type="icon"
      theme="outline"
      size="large"
      text="signin_with"
      shape="pill"
      logo_alignment="center"
    />
  );
}
