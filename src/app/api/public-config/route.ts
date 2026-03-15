import { NextResponse } from "next/server";

/**
 * Returns public config for the client (e.g. brochure URL).
 * Reads from server env so production can use Azure App Service settings
 * without rebuilding. Also supports NEXT_PUBLIC_* set at build time.
 */
export async function GET() {
  const brochureUrl =
    process.env.NEXT_PUBLIC_BROCHURE_URL ||
    process.env.BROCHURE_URL ||
    "";
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return NextResponse.json({
    brochureUrl: brochureUrl.trim() || null,
    recaptchaSiteKey: recaptchaSiteKey.trim() || null,
  });
}
