"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ContactUs = dynamic(() => import("./ContactUs"), { ssr: false });

const ContactUsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </Suspense>
  );
};

export default ContactUsWrapper;
