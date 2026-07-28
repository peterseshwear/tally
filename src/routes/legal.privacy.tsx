import { createFileRoute } from "@tanstack/react-router";
import {
  LegalLayout,
  Section,
  P,
  UL,
  Callout,
  Placeholder,
  LinkTo,
  type TocItem,
} from "@/components/legal/LegalLayout";

const UPDATED = "January 15, 2026";
const URL = "https://golden-tally-revamp.lovable.app/legal/privacy";

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "collected", label: "Information we collect" },
  { id: "cookies", label: "Cookies & analytics" },
  { id: "use", label: "How we use information" },
  { id: "sharing", label: "Sharing & providers" },
  { id: "retention", label: "Data retention" },
  { id: "rights", label: "Your rights" },
  { id: "transfers", label: "International transfers" },
  { id: "basis", label: "Legal basis" },
  { id: "requests", label: "Privacy requests" },
  { id: "updates", label: "Policy updates" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/legal/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Tally" },
      {
        name: "description",
        content:
          "How Tally collects, uses, protects and shares information across our website, dashboard and payment services. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Privacy Policy — Tally" },
      {
        property: "og:description",
        content:
          "A clear, transparent explanation of how Tally handles personal and business information.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      intro="Tally is a payments and commerce platform operated by Nesta Business LLC. This policy explains what information we collect, how we use it, and the choices you have. We aim to keep it clear and free of legal jargon."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="overview" title="Overview">
        <P>
          This Privacy Policy applies to the Tally website, dashboard, APIs, integrations and
          related services (together, the “Services”), operated by Nesta Business LLC (“Tally”,
          “we”, “us”). It describes how we handle information about visitors, merchants using our
          platform and the shoppers who interact with merchant checkouts powered by Tally.
        </P>
        <Callout>
          A quick note: for shoppers who buy from a merchant using Tally, the merchant is generally
          the controller of their personal information. Tally processes that information on the
          merchant’s behalf under a data processing agreement.
        </Callout>
      </Section>

      <Section id="collected" title="Information we collect">
        <P>
          We collect information you provide directly, information generated when you use the
          Services, and information we receive from partners such as ecommerce platforms and
          identity or fraud providers.
        </P>
        <UL>
          <li>
            <strong>Account information.</strong> Your name, email address, password, role and
            workspace preferences when you create a Tally account.
          </li>
          <li>
            <strong>Business information.</strong> Business name, website, industry, address,
            contact details and, where required, tax identifiers.
          </li>
          <li>
            <strong>Merchant information.</strong> Store URLs, plan tier, connected apps and
            settings you configure inside the dashboard.
          </li>
          <li>
            <strong>Transaction metadata.</strong> Order references, amounts, currencies,
            timestamps, payment method type, refund and dispute status. We do not store full card
            numbers; card data is handled by our payment processing partners.
          </li>
          <li>
            <strong>Technical information.</strong> IP address, browser type, operating system,
            referring URL, pages viewed and diagnostic logs.
          </li>
          <li>
            <strong>Device information.</strong> Device identifiers, language, timezone and screen
            characteristics when you use our web app or checkout.
          </li>
          <li>
            <strong>Communications.</strong> Messages you send to support, forms you submit, and
            records of meetings you schedule with us.
          </li>
        </UL>
      </Section>

      <Section id="cookies" title="Cookies & analytics">
        <P>
          We use cookies and similar technologies to keep you signed in, remember your preferences
          and understand how the Services are used. You can manage your choices from our cookie
          banner or the footer of the site. For details, see our{" "}
          <LinkTo to="/legal/cookies">Cookie Policy</LinkTo>.
        </P>
      </Section>

      <Section id="use" title="How we use information">
        <UL>
          <li>Provide, secure and operate the Services.</li>
          <li>Process payments, payouts and related financial workflows.</li>
          <li>Detect, prevent and investigate fraud, abuse and security incidents.</li>
          <li>Communicate with you about product updates, service notices and support.</li>
          <li>Comply with legal, tax and regulatory obligations.</li>
          <li>Improve the Services and develop new features.</li>
        </UL>
      </Section>

      <Section id="sharing" title="Sharing & third-party providers">
        <P>
          We share information only where it is necessary to operate the Services or where legally
          required. This includes cloud infrastructure providers, payment processors, fraud and
          identity providers, email and analytics tools, and professional advisors. Each provider is
          bound by contractual obligations covering confidentiality and data protection.
        </P>
      </Section>

      <Section id="retention" title="Data retention">
        <P>
          We keep personal information for as long as needed to provide the Services, comply with
          legal obligations, resolve disputes and enforce our agreements. Retention periods vary by
          data category — for example, transaction records are typically retained for longer periods
          to meet financial recordkeeping requirements.
        </P>
      </Section>

      <Section id="rights" title="Your rights">
        <P>
          Depending on where you live, you may have the right to access, correct, delete, restrict
          or object to certain processing of your personal information, and to receive a portable
          copy. You can exercise these rights by contacting us at{" "}
          <Placeholder label="{{Privacy Email}}" />.
        </P>
      </Section>

      <Section id="transfers" title="International transfers">
        <P>
          Tally operates globally. Where we transfer personal information across borders, we use
          appropriate safeguards such as standard contractual clauses and equivalent mechanisms
          recognized by applicable law.
        </P>
      </Section>

      <Section id="basis" title="Legal basis for processing">
        <P>
          Where the GDPR or similar laws apply, we process personal information on the basis of
          contract performance, legal obligation, our legitimate interests in operating and
          improving the Services, and consent where required. Detailed information is available in
          our <LinkTo to="/legal/gdpr">GDPR &amp; Privacy</LinkTo> page.
        </P>
      </Section>

      <Section id="requests" title="Privacy requests">
        <P>
          To submit a privacy request, email <Placeholder label="{{Privacy Email}}" /> with your
          request and enough information to verify your identity. We will respond within the
          timeframes required by applicable law.
        </P>
      </Section>

      <Section id="updates" title="Policy updates">
        <P>
          We may update this policy from time to time. When we do, we will revise the “Last updated”
          date at the top of this page and, for material changes, provide additional notice.
        </P>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          <strong>Nesta Business LLC</strong>
          <br />
          Registered address: <Placeholder label="{{Registered Address}}" />
          <br />
          Privacy: <Placeholder label="{{Privacy Email}}" />
          <br />
          Support: <Placeholder label="{{Support Email}}" />
          <br />
          Website: <Placeholder label="{{Website}}" />
        </P>
        <Callout>
          This document is provided for transparency and does not constitute legal advice. It should
          be reviewed by qualified legal counsel before publication.
        </Callout>
      </Section>
    </LegalLayout>
  );
}
