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
const URL = "https://golden-tally-revamp.lovable.app/legal/acceptable-use";

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "fraud", label: "Fraud" },
  { id: "aml", label: "Money laundering" },
  { id: "sanctions", label: "Sanctioned activities" },
  { id: "illegal", label: "Illegal businesses" },
  { id: "abuse", label: "Abuse" },
  { id: "spam", label: "Spam" },
  { id: "security", label: "Security abuse" },
  { id: "reverse", label: "Reverse engineering" },
  { id: "api", label: "API abuse" },
  { id: "enforcement", label: "Enforcement" },
  { id: "report", label: "Report a violation" },
];

export const Route = createFileRoute("/legal/acceptable-use")({
  component: AUPPage,
  head: () => ({
    meta: [
      { title: "Acceptable Use Policy — Tally" },
      {
        name: "description",
        content:
          "The activities that are prohibited on the Tally platform and how we enforce these rules. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Acceptable Use Policy — Tally" },
      {
        property: "og:description",
        content: "Clear rules that keep Tally safe for merchants, shoppers and our team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function AUPPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Acceptable use"
      title="Acceptable Use Policy"
      intro="This policy sets out how Tally, operated by Nesta Business LLC, may and may not be used. It applies to everyone using the platform — merchants, developers, partners and shoppers."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="overview" title="Overview">
        <P>
          You may not use the Services in a way that harms others, violates the law or undermines
          the integrity of the platform. This policy is a non-exhaustive list of what that means in
          practice. We may update it as new risks emerge.
        </P>
      </Section>

      <Section id="fraud" title="Fraud">
        <UL>
          <li>Submitting or facilitating fraudulent transactions.</li>
          <li>Using stolen payment credentials or synthetic identities.</li>
          <li>Chargeback abuse or intentional misrepresentation of goods or services.</li>
          <li>Deceptive pricing, hidden charges or misleading subscription enrollment.</li>
        </UL>
      </Section>

      <Section id="aml" title="Money laundering & financial crime">
        <P>
          You may not use the Services to disguise the origin or ownership of funds, to structure
          transactions to avoid reporting obligations, or to finance terrorism or other prohibited
          activities.
        </P>
      </Section>

      <Section id="sanctions" title="Sanctioned activities">
        <P>
          Tally must comply with applicable sanctions programs. The Services may not be used by, on
          behalf of, or for the benefit of sanctioned persons, entities or jurisdictions.
        </P>
      </Section>

      <Section id="illegal" title="Illegal businesses">
        <UL>
          <li>Sale of illegal goods or services.</li>
          <li>Businesses without required licenses or permits.</li>
          <li>Activities that infringe intellectual property, privacy or publicity rights.</li>
          <li>Businesses prohibited by our payment partners or card network rules.</li>
        </UL>
      </Section>

      <Section id="abuse" title="Abuse, harassment & harmful content">
        <P>
          Content or behavior that targets, harasses or endangers individuals or groups is not
          allowed. This includes threats, doxxing, and content that exploits or endangers minors.
        </P>
      </Section>

      <Section id="spam" title="Spam & deceptive marketing">
        <P>
          Unsolicited bulk messaging, false advertising and deceptive promotional practices are
          prohibited. Marketing communications must comply with applicable laws, including CAN-SPAM,
          GDPR and similar regulations.
        </P>
      </Section>

      <Section id="security" title="Security abuse">
        <UL>
          <li>Bypassing or attempting to bypass authentication or access controls.</li>
          <li>
            Probing, scanning or testing the vulnerability of the Services without prior written
            permission.
          </li>
          <li>Interfering with the integrity or performance of the Services.</li>
          <li>Uploading malware or other harmful code.</li>
        </UL>
        <Callout>
          Security researchers acting in good faith should follow our responsible disclosure process
          on the <LinkTo to="/legal/security">Security page</LinkTo>.
        </Callout>
      </Section>

      <Section id="reverse" title="Reverse engineering">
        <P>
          You may not decompile, reverse engineer, disassemble or attempt to derive source code from
          the Services, except to the extent expressly permitted by applicable law.
        </P>
      </Section>

      <Section id="api" title="API abuse">
        <UL>
          <li>Exceeding documented rate limits or circumventing throttling.</li>
          <li>Sharing API credentials or embedding secret keys in client-side code.</li>
          <li>Using the API to scrape, resell or reconstruct our Services.</li>
        </UL>
      </Section>

      <Section id="enforcement" title="Enforcement">
        <P>
          Where we identify a violation, we may take actions proportionate to the risk — including
          warnings, throttling, feature restrictions, holding funds pending investigation,
          suspension or termination. We may also notify law enforcement where required.
        </P>
      </Section>

      <Section id="report" title="Report a violation">
        <P>
          To report suspected abuse of the platform, contact{" "}
          <Placeholder label="{{Support Email}}" /> or use the{" "}
          <LinkTo to="/contact-us">Contact page</LinkTo>.
        </P>
      </Section>
    </LegalLayout>
  );
}
