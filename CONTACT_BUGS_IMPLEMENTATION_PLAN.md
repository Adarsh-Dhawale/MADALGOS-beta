# Contact Us – Bugs & Features – Implementation Plan

## 1. Contact form not fully visible on screen (scroll required)

**Issue:** Clicking "Contact US" does not fully show the contact form; user has to scroll.

**Approach:**
- Add an `id="contact-form"` to the form container on the contact page.
- On page load, smoothly scroll the form into view so the form (and Send button) is visible without manual scrolling.

**Files:** `src/app/contact/page.tsx`

---

## 2. Add WhatsApp links for contact numbers and emails

**Issue:** Phone and email are shown but no WhatsApp links. Required: Phone +91-9599204039, Emails contact@MADAlgos.in and team@MADAlgos.in; WhatsApp: +91-9599204039 and +91-7032257346.

**Approach:**
- Update contact page left column:
  - **Phone:** Show +91-9599204039 with a `tel:` link and a WhatsApp button/link (wa.me or api.whatsapp.com).
  - Add second WhatsApp contact +91-7032257346 as a second WhatsApp link/button.
  - **Email:** Show contact@MADAlgos.in and team@MADAlgos.in as mailto links.

**Files:** `src/app/contact/page.tsx`

---

## 3. +91 prefix should stay fixed in Contact field

**Issue:** The "+91" in the contact input disappears when the user types the number.

**Approach:**
- Use a wrapper that looks like one input: fixed "+91 " on the left, and a separate `<input>` for digits only (no placeholder "+91" inside the input). On submit, send `phone: "+91" + digits`.

**Files:** `src/app/contact/page.tsx`

---

## 4. Optional College / University / Organization field

**Issue:** Add one optional field: "College Name / University Name / Organization Name".

**Approach:**
- Add optional form field and include it in the submit payload.
- API: accept `organization` (or `collegeName`), save to DB if present.
- DB: add optional `organization` (or similar) to ContactInquiry schema.

**Files:** `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`, `src/models/ContactInquiry.ts`

---

## 5. Confirmation: "Sending message" and 48hr dialog

**Issue:** On submit, show "Sending message" while sending; after success show "We have received your email and we will reach out to you within 48 hrs." in a dialog. Currently it shows "Email sent successfully".

**Approach:**
- Keep button text as "Sending..." during submit (already present).
- On success, open a dialog/modal with the new message: "We have received your email and we will reach out to you within 48 hrs." and a close/OK button. Remove or replace the inline "Email sent successfully" with this dialog.

**Files:** `src/app/contact/page.tsx` (add Dialog component or simple modal)

---

## 6. Email template and reply-to

**Issue:** Inquiry email should be a proper template (not plain text only). Add reply-to contact@madalgos.in so replies reach the team.

**Approach:**
- In the contact API, for the inquiry email to contact@madalgos.in:
  - Use SendGrid HTML body (e.g. `html:` with a simple branded template).
  - Add `replyTo: "contact@madalgos.in"` (or the verified from address as needed).
- Optionally improve the confirmation email to the user with HTML and reply-to.

**Files:** `src/app/api/contact/route.ts`

---

## Order of implementation

1. **#3** – Fixed +91 prefix (form field change).
2. **#4** – Optional organization field (form + API + model).
3. **#2** – WhatsApp links and updated phone/emails on contact page.
4. **#1** – Scroll form into view on load.
5. **#5** – Success dialog and copy.
6. **#6** – HTML email template and reply-to.
