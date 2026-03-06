"use client";

import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  setVerified: (v: boolean) => void;
  setToken: (token: string | null) => void;
}

const ReCaptchaComponent = ({ setVerified, setToken }: ReCaptchaProps) => {
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Auto-verify if no site key configured (local dev)
  useEffect(() => {
    if (!sitekey) {
      setVerified(true);
      setToken(null);
    }
  }, [sitekey, setVerified, setToken]);

  const handleOnChange = (value: string | null) => {
    setToken(value);
    setVerified(!!value);
  };

  if (!sitekey) return null;

  return (
    <div className="flex justify-center pt-2">
      <ReCAPTCHA size="normal" sitekey={sitekey} onChange={handleOnChange} />
    </div>
  );
};

export default ReCaptchaComponent;

