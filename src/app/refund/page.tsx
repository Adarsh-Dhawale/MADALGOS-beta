import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const sections = [
  {
    id: 1,
    title: "RETURNS",
    content: `All returns must be postmarked within seven (7) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.`,
  },
  {
    id: 2,
    title: "RETURN PROCESS",
    content: `To return an item, please email customer service at contact@madalgos.in to obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA number, place the item securely in its original packaging and include your proof of purchase, and mail your return to the following address:

contact@madalgos.in
Attn: Returns / RMA #
Nallagandla, Hyderabad 500019
Telangana, India

Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.`,
  },
  {
    id: 3,
    title: "REFUNDS",
    content: `After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least thirty (30) days from the receipt of your item to process your return. We will notify you by email when your return has been processed.`,
  },
  {
    id: 4,
    title: "EXCEPTIONS",
    content: `For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.`,
  },
  {
    id: 5,
    title: "QUESTIONS",
    content: `If you have any questions concerning our return policy, please contact us at: contact@madalgos.in`,
  },
];

export default function RefundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />

      <main className="pt-28 md:pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">

          {/* Hero */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-9 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Legal
            </span>
            <span className="h-[2px] w-9 rounded-full bg-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Return &amp; Refund Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated{" "}
            <span className="text-primary font-medium">September 10, 2021</span>
          </p>

          {/* Intro */}
          <div className="mb-10 rounded-2xl border border-white/8 bg-card/40 px-6 py-5 text-sm text-muted-foreground leading-relaxed">
            Thank you for your purchase. We hope you are happy with your purchase.
            However, if you are not completely satisfied with your purchase for any
            reason, you may return it to us for{" "}
            <span className="text-foreground font-medium">store credit only</span>.
            Please see below for more information on our return policy.
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((s) => (
              <section
                key={s.id}
                id={`section-${s.id}`}
                className="scroll-mt-32 rounded-2xl border border-white/8 bg-card/40 px-6 py-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[11px] font-bold text-primary">
                    {s.id}
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-foreground leading-snug">
                    {s.title
                      .split(" ")
                      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
                      .join(" ")}
                  </h2>
                </div>

                <div className="pl-10">
                  {s.content.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line mb-3 last:mb-0"
                    >
                      {para.trim()}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact box */}
          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/8 px-6 py-6">
            <h2 className="mb-4 text-base font-semibold text-foreground">
              Contact Us
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              For any questions regarding our return &amp; refund policy, reach out to us:
            </p>
            <address className="not-italic space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">MAD Algos</p>
              <p>Nallagandla, Hyderabad 500019</p>
              <p>Telangana, India</p>
              <p className="pt-2">
                Phone:{" "}
                <a href="tel:+917032257346" className="text-primary hover:underline">
                  +91-7032257346
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@madalgos.in"
                  className="text-primary hover:underline"
                >
                  contact@madalgos.in
                </a>
              </p>
            </address>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
