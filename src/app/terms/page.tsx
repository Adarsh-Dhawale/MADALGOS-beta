import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const sections = [
  {
    title: "AGREEMENT TO TERMS",
    content: `These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and MAD Algos ("Company," "we," "us," or "our"), concerning your access to and use of the https://madalgos.in website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). We are registered in India and have our registered office at Nallagandla Hyderabad India, Hyderabad, Telangana 500019. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.

Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. We will alert you about any changes by updating the "Last updated" date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.

The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.

The Site is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Site. You may not use the Site in a way that would violate the Gramm-Leach-Bliley Act (GLBA).

The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.`,
  },
  {
    title: "INTELLECTUAL PROPERTY RIGHTS",
    content: `Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission. Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.`,
  },
  {
    title: "USER REPRESENTATIONS",
    content: `By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation. If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).`,
  },
  {
    title: "USER REGISTRATION",
    content: `You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.`,
  },
  {
    title: "PROHIBITED ACTIVITIES",
    content: `You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.`,
    list: [
      "Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
      "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
      "Circumvent, disable, or otherwise interfere with security-related features of the Site.",
      "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.",
      "Use any information obtained from the Site in order to harass, abuse, or harm another person.",
      "Make improper use of our support services or submit false reports of abuse or misconduct.",
      "Use the Site in a manner inconsistent with any applicable laws or regulations.",
      "Engage in unauthorized framing of or linking to the Site.",
      "Upload or transmit viruses, Trojan horses, or other harmful material that interferes with any party's uninterrupted use of the Site.",
      "Engage in any automated use of the system, such as using scripts to send comments or messages, or using data mining, robots, or similar tools.",
      "Delete the copyright or other proprietary rights notice from any Content.",
      "Attempt to impersonate another user or person or use the username of another user.",
      "Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.",
      "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.",
      "Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.",
      "Copy or adapt the Site's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.",
      "Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.",
      "Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.",
      "Sell or otherwise transfer your profile.",
    ],
  },
  {
    title: "USER GENERATED CONTRIBUTIONS",
    content: `The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality. When you create or make available any Contributions, you thereby represent and warrant that:`,
    list: [
      "The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights of any third party.",
      "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use your Contributions.",
      "Your Contributions are not false, inaccurate, or misleading.",
      "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, or mass mailings.",
      "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable.",
      "Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.",
      "Your Contributions do not violate any applicable law, regulation, or rule.",
      "Your Contributions do not violate the privacy or publicity rights of any third party.",
      "Your Contributions do not include any offensive comments connected to race, national origin, gender, sexual preference, or physical handicap.",
    ],
  },
  {
    title: "CONTRIBUTION LICENSE",
    content: `By posting your Contributions to any part of the Site, you automatically grant to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.

We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site.`,
  },
  {
    title: "SOCIAL MEDIA",
    content: `As part of the functionality of the Site, you may link your account with online accounts you have with third-party service providers. You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS.`,
  },
  {
    title: "SUBMISSIONS",
    content: `You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.`,
  },
  {
    title: "SITE MANAGEMENT",
    content: `We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof; (4) remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property.`,
  },
  {
    title: "PRIVACY POLICY",
    content: `We care about data privacy and security. By using the Site, you agree to be bound by our Privacy Policy posted on the Site, which is incorporated into these Terms of Use. Please be advised the Site is hosted in India. If you access the Site from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued use of the Site, you are transferring your data to India, and you agree to have your data transferred to and processed in India.`,
  },
  {
    title: "TERM AND TERMINATION",
    content: `These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION.

If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party.`,
  },
  {
    title: "MODIFICATIONS AND INTERRUPTIONS",
    content: `We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site.`,
  },
  {
    title: "GOVERNING LAW",
    content: `These Terms shall be governed by and defined following the laws of India. MAD Algos and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.`,
  },
  {
    title: "DISPUTE RESOLUTION",
    content: `To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.

Any dispute arising out of or in connection with this contract shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC. The seat of arbitration shall be Hyderabad, India. The language of the proceedings shall be English/Hindi. The governing law of the contract shall be the substantive law of India.

The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, no arbitration shall be joined with any other proceeding and there is no right or authority for any Dispute to be arbitrated on a class-action basis.`,
  },
  {
    title: "CORRECTIONS",
    content: `There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.`,
  },
  {
    title: "DISCLAIMER",
    content: `THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE'S CONTENT AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS.`,
  },
  {
    title: "LIMITATIONS OF LIABILITY",
    content: `IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE ONE (1) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.`,
  },
  {
    title: "INDEMNIFICATION",
    content: `You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site.`,
  },
  {
    title: "USER DATA",
    content: `We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data.`,
  },
  {
    title: "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
    content: `Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE.`,
  },
  {
    title: "MISCELLANEOUS",
    content: `These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. We may assign any or all of our rights and obligations to others at any time. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions.`,
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />

      <main className="pt-28 md:pt-32 pb-24">
        {/* Hero */}
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-9 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Legal
            </span>
            <span className="h-[2px] w-9 rounded-full bg-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated{" "}
            <span className="text-primary font-medium">September 10, 2021</span>
          </p>

          {/* Table of contents */}
          <nav className="mb-12 rounded-2xl border border-white/8 bg-card/60 px-6 py-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Table of Contents
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 list-decimal list-inside">
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.title
                      .split(" ")
                      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
                      .join(" ")}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className="scroll-mt-32 rounded-2xl border border-white/8 bg-card/40 px-6 py-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-foreground leading-snug">
                    {s.title
                      .split(" ")
                      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
                      .join(" ")}
                  </h2>
                </div>

                <div className="pl-10 space-y-3">
                  {s.content.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {para.trim()}
                    </p>
                  ))}

                  {s.list && (
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item, li) => (
                        <li key={li} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
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
              In order to resolve a complaint regarding the Site or to receive
              further information regarding use of the Site, please contact us at:
            </p>
            <address className="not-italic space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">MAD Algos</p>
              <p>7th Floor Ramky One Galaxia</p>
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
