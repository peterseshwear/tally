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
const URL = "https://golden-tally-revamp.lovable.app/legal/security";

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "encryption", label: "Encryption" },
  { id: "auth", label: "Authentication" },
  { id: "infra", label: "Infrastructure" },
  { id: "monitoring", label: "Monitoring" },
  { id: "access", label: "Access controls" },
  { id: "incident", label: "Incident response" },
  { id: "disclosure", label: "Responsible disclosure" },
  { id: "practices", label: "Best practices" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/legal/security")({
  component: SecurityPage,
  head: () => ({
    meta: [
      { title: "Security — Tally" },
      {
        name: "description",
        content:
          "How Tally protects merchant and shopper data through encryption, secure infrastructure, monitoring and incident response. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Security — Tally" },
      {
        property: "og:description",
        content: "A transparent overview of the security practices behind the Tally platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function SecurityPage() {
  return (
    <LegalLayout
      eyebrow="Trust · Security"
      title="Security at Tally"
      intro="Security is a foundation of the Tally platform. This page describes the practices Nesta Business LLC uses to protect the confidentiality, integrity and availability of the Services and the information entrusted to us."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="overview" title="Overview">
        <P>
          Tally is designed with defense in depth. Controls are layered across our application,
          infrastructure and operations so that a failure in any one layer does not compromise the
          platform as a whole. This page summarizes the practices in place today and is updated as
          the program evolves.
        </P>
        <Callout>
          This page is maintained by Nesta Business LLC to answer common security questions about
          Tally. It describes enabled controls and current practices and does not constitute a
          certification.
        </Callout>
      </Section>

      <Section id="encryption" title="Encryption">
        <UL>
          <li>
            <strong>In transit.</strong> All connections to Tally use TLS with modern cipher suites.
            HTTP requests are redirected to HTTPS.
          </li>
          <li>
            <strong>At rest.</strong> Data stored in our primary databases and object storage is
            encrypted at rest using industry-standard algorithms managed by our cloud providers.
          </li>
          <li>
            <strong>Sensitive fields.</strong> Additional application-level controls apply to
            sensitive fields such as secrets and API keys.
          </li>
        </UL>
      </Section>

      <Section id="auth" title="Authentication">
        <UL>
          <li>Password authentication with modern hashing.</li>
          <li>Optional single sign-on with supported identity providers.</li>
          <li>Multi-factor authentication for administrative operations.</li>
          <li>Session management with automatic expiration and revocation.</li>
        </UL>
      </Section>

      <Section id="infra" title="Infrastructure security">
        <P>
          Tally runs on reputable cloud infrastructure with network isolation, hardened machine
          images, and configuration managed as code. Changes go through peer review and automated
          checks before deployment.
        </P>
      </Section>

      <Section id="monitoring" title="Monitoring & logging">
        <P>
          We centralize application, infrastructure and security logs. Alerts route to on-call
          engineers for triage. Baselines and anomaly detection help us identify unusual behavior
          early.
        </P>
      </Section>

      <Section id="access" title="Access controls">
        <UL>
          <li>Access to production systems follows the principle of least privilege.</li>
          <li>Administrative access requires strong authentication and is logged.</li>
          <li>Access rights are reviewed periodically and revoked when no longer needed.</li>
        </UL>
      </Section>

      <Section id="incident" title="Incident response">
        <P>
          We maintain an incident response process covering detection, containment, eradication,
          recovery and post-incident review. Where an incident affects customer data and
          notification is required, we notify affected customers in line with applicable law and our
          contractual obligations.
        </P>
      </Section>

      <Section id="disclosure" title="Responsible disclosure">
        <P>
          We welcome reports from the security community. If you believe you have found a
          vulnerability in the Services, please email <Placeholder label="{{Support Email}}" /> with
          the subject line “Security disclosure”. Please provide enough detail to reproduce the
          issue and avoid actions that could harm the platform or its users (for example, denial of
          service, data exfiltration or accessing accounts that are not your own).
        </P>
      </Section>

      <Section id="practices" title="Security best practices for merchants">
        <UL>
          <li>Use unique, strong passwords and enable multi-factor authentication.</li>
          <li>Rotate API keys periodically and never commit them to client-side code.</li>
          <li>Grant team members the minimum role required for their tasks.</li>
          <li>Verify webhook signatures on every incoming request.</li>
        </UL>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          For general security questions, visit our <LinkTo to="/contact-us">Contact page</LinkTo>.
          Sensitive reports should be sent to <Placeholder label="{{Support Email}}" /> with
          “Security” in the subject line.
        </P>
      </Section>
    </LegalLayout>
  );
}
