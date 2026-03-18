import sgMail from "@sendgrid/mail";

function hasSendgrid(): boolean {
  return !!process.env.SendGridDevKey;
}

export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  if (!hasSendgrid()) return;
  sgMail.setApiKey(process.env.SendGridDevKey as string);
  const from = process.env.MAIL_FROM || "team@madalgos.in";
  await sgMail.send({
    to: opts.to,
    from,
    subject: opts.subject,
    html: opts.html,
  });
}

