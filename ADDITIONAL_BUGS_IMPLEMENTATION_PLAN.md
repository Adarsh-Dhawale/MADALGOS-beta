# Additional Bugs – Implementation Plan (from images)

## 1. Email sanitization & XSS in emails

**Issue:** User-provided data (e.g. email field) must not be inserted raw into email HTML; invalid/malicious input (e.g. script tags) was shown in "Order email" example.

**Approach:**
- Contact API already uses `escapeHtml()` for inquiry and confirmation email HTML. Ensure all user fields (name, email, phone, message, organization) are escaped in HTML.
- Add server-side email format validation: reject requests where `email` is not a valid email pattern before sending.

**Files:** `src/app/api/contact/route.ts`

---

## 2. Typo: contact@MADAigos.in → contact@MADAlgos.in

**Issue:** Footer or email copy had "MADAigos" (typo). Should be "MADAlgos".

**Approach:** Search and replace any occurrence of MADAigos with MADAlgos in codebase and email templates.

**Files:** Grep and fix any occurrence.

---

## 3. Real-time email validation in contact form

**Issue:** Email field should show validation errors in real time as the user types (e.g. "dsdsds" should show an error). Currently no error is shown for invalid email.

**Approach:**
- Add client-side validation: validate email format on change or on blur.
- Show an error message below the email input when invalid (e.g. "Please enter a valid email address").
- Use a simple regex or the HTML5 constraint (type="email" + checkValidity) and show message only when field is touched and invalid.

**Files:** `src/app/contact/page.tsx`

---

## 4. Footer Contact HQ – correct phone and email (Bug 9)

**Issue:** "Contact HQ" in footer shows wrong details: +91 800 210 8080 and hello@madalgos.com. Should use the correct contact info.

**Approach:**
- Update footer contactInfo to: Phone +91-9599204039 (with tel link), primary email contact@MADAlgos.in (and optionally team@MADAlgos.in). Match the contact page and earlier requirements.

**Files:** `src/components/sections/footer.tsx`

---

## 5. Copyright year 2026 → 2021 (Bug 10)

**Issue:** Footer copyright says "© 2026 MAD ALGOS TECHNOLOGIES". It should be 2021.

**Approach:** Replace 2026 with 2021 in the footer copyright text.

**Files:** `src/components/sections/footer.tsx`

---

## 6. Blog section heading alignment (Bug 11)

**Issue:** "Text heading needs change as per Blogs Section." The /blogs page has "Industry-grade insights from MADAlgos mentors." The homepage Blogs section uses "Industry-ready Insights".

**Approach:** Align the /blogs page main heading with the homepage blogs section wording: use "Industry-ready Insights" (or "Industry-ready insights from MADAlgos mentors" to keep context).

**Files:** `src/app/blogs/page.tsx`

---

## 7. Apply Now → Contact Us form (Bug 12)

**Issue:** "Apply Now should take to Contact Us form."

**Approach:** Change the "Apply Now" button in the hero to a link that navigates to the contact form: `/contact` or `/contact#contact-form`.

**Files:** `src/components/sections/hero.tsx`

---

## 8. Download Brochure → env-controlled URL (Bug 12)

**Issue:** "Download Brochure should point to a file that location should be controlled by env variable. I should be able to change it anytime."

**Approach:**
- Add an env variable (e.g. `NEXT_PUBLIC_BROCHURE_URL`) for the brochure PDF/download URL.
- In the hero, make "Download Brochure" a link that uses this URL (open in new tab or download). If the variable is not set, hide the button or show a placeholder.
- Document in `.env.example`.

**Files:** `src/components/sections/hero.tsx`, `.env.example`

---

## Order of implementation

1. **#2** – Fix MADAigos typo (if any).
2. **#4 & #5** – Footer: Contact HQ + copyright year.
3. **#3** – Real-time email validation on contact form.
4. **#1** – Server-side email validation + ensure all HTML escaped.
5. **#6** – Blog page heading.
6. **#7 & #8** – Hero: Apply Now link + Download Brochure env URL.
