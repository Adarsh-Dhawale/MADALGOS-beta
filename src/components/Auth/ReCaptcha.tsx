"use client";

import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  setVerified: (v: boolean) => void;
  setToken: (token: string | null) => void;
}

const ReCaptchaComponent = ({ setVerified, setToken }: ReCaptchaProps) => {
  // Prefer build-time key; fallback to runtime from /api/public-config (Azure App Service env)
  const [sitekey, setSitekey] = useState<string | null>(
    () => process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null
  );
  const [configFetched, setConfigFetched] = useState(false);

  useEffect(() => {
    if (sitekey) return;
    fetch("/api/public-config")
      .then((r) => r.json())
      .then((data: { recaptchaSiteKey?: string | null }) => {
        setConfigFetched(true);
        if (data.recaptchaSiteKey) setSitekey(data.recaptchaSiteKey);
      })
      .catch(() => setConfigFetched(true));
  }, [sitekey]);

  // Auto-verify if no site key after trying build + API (so form still works)
  useEffect(() => {
    if (configFetched && !sitekey) {
      setVerified(true);
      setToken(null);
    }
  }, [configFetched, sitekey, setVerified, setToken]);

  const handleOnChange = (value: string | null) => {
    setToken(value);
    setVerified(!!value);
  };

  if (!sitekey) {
    return null;
  }

  return (
    <div className="flex justify-center pt-2">
      <ReCAPTCHA size="normal" sitekey={sitekey} onChange={handleOnChange} />
    </div>
  );
};

export default ReCaptchaComponent;

