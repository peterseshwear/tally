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
const URL = "https://golden-tally-revamp.lovable.app/legal/terms";

const toc: TocItem[] = [
  { id: "eligibility", label: "Eligibility" },
  { id: "accounts", label: "User accounts" },
  { id: "merchant", label: "Merchant responsibilities" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "fees", label: "Fees" },
  { id: "billing", label: "Billing" },
  { id: "availability", label: "Platform availability" },
  { id: "ip", label: "Intellectual property" },
  { id: "aup", label: "Acceptable use" },
  { id: "termination", label: "Termination" },
  { id: "suspension", label: "Suspension" },
  { id: "refunds", label: "Refunds" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/legal/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — Tally" },
      {
        name: "description",
        content:
          "The terms governing your use of the Tally platform, dashboard and APIs. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Terms of Service — Tally" },
      {
        property: "og:description",
        content: "The rules of the road for merchants, developers and teams using Tally.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Terms"
      title="Terms of Service"
      intro="These Terms govern your access to and use of the Tally website, dashboard and APIs (the “Services”), provided by Nesta Business LLC (“Tally”, “we”, “us”). By using the Services you agree to these Terms."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="eligibility" title="Eligibility">
        <P>
          You must be at least the age of majority in your jurisdiction and legally able to enter
          into contracts to use the Services. If you use the Services on behalf of an organization,
          you represent that you have authority to bind that organization to these Terms.
        </P>
      </Section>

      <Section id="accounts" title="User accounts">
        <P>
          You are responsible for the accuracy of the information provided at sign-up, for
          maintaining the confidentiality of your credentials and for all activity that occurs under
          your account. Notify us promptly if you suspect unauthorized access.
        </P>
      </Section>

      <Section id="merchant" title="Merchant responsibilities">
        <UL>
          <li>Provide accurate business information and keep it up to date.</li>
          <li>
            Comply with applicable laws, including consumer protection, taxation and data
            protection.
          </li>
          <li>Publish clear terms of sale, refund and shipping policies on your storefront.</li>
          <li>Respond to shopper inquiries and disputes in a timely manner.</li>
          <li>
            Ensure your use of the Services complies with our{" "}
            <LinkTo to="/legal/acceptable-use">Acceptable Use Policy</LinkTo>.
          </li>
        </UL>
      </Section>

      <Section id="subscriptions" title="Subscriptions">
        <P>
          Certain features are available under paid subscription plans. Plan details, features and
          included volumes are described on our <LinkTo to="/pricing">Pricing page</LinkTo>. Unless
          otherwise stated, subscriptions renew automatically for successive periods.
        </P>
      </Section>

      <Section id="fees" title="Fees">
        <P>
          Fees for the Services are listed on our Pricing page and may include per-transaction fees,
          subscription fees and add-on charges. We may update our fees with reasonable prior notice.
        </P>
      </Section>

      <Section id="billing" title="Billing">
        <P>
          You authorize us and our payment providers to charge your designated payment method for
          all fees and taxes owed. If a payment fails, we may retry the charge and, after reasonable
          notice, suspend paid features until payment is received.
        </P>
      </Section>

      <Section id="availability" title="Platform availability">
        <P>
          We work hard to keep the Services available and performant, but we do not guarantee
          uninterrupted access. Scheduled maintenance, upgrades and events outside our reasonable
          control may occasionally affect availability. Status information is published on our
          public status page.
        </P>
      </Section>

      <Section id="ip" title="Intellectual property">
        <P>
          The Services, including software, design and content we create, are owned by Nesta
          Business LLC or our licensors and are protected by intellectual property laws. You retain
          ownership of content you submit and grant us a limited license to host, process and
          display it as needed to operate the Services.
        </P>
      </Section>

      <Section id="aup" title="Acceptable use">
        <P>
          Your use of the Services must comply with our{" "}
          <LinkTo to="/legal/acceptable-use">Acceptable Use Policy</LinkTo>, which is incorporated
          into these Terms.
        </P>
      </Section>

      <Section id="termination" title="Termination">
        <P>
          You may stop using the Services at any time. We may terminate or suspend your account if
          you materially breach these Terms, if required by law, or if continued provision of the
          Services creates risk for other users or for us.
        </P>
      </Section>

      <Section id="suspension" title="Suspension">
        <P>
          We may temporarily suspend access to protect the Services or investigate suspected
          violations, and will provide notice where reasonably possible.
        </P>
      </Section>

      <Section id="refunds" title="Refund policy">
        <P>
          Subscription fees are generally non-refundable except where required by law.
          Transaction-level refunds to shoppers are managed by merchants through the Tally
          dashboard, subject to the underlying payment method rules.
        </P>
      </Section>

      <Section id="disclaimers" title="Disclaimers">
        <P>
          To the maximum extent permitted by law, the Services are provided “as is” and “as
          available” without warranties of any kind, whether express or implied. We do not warrant
          that the Services will be uninterrupted, secure or error-free.
        </P>
      </Section>

      <Section id="liability" title="Limitation of liability">
        <P>
          To the maximum extent permitted by law, Nesta Business LLC and its affiliates will not be
          liable for indirect, incidental, special, consequential or punitive damages, or for lost
          profits, revenues or data arising out of or related to your use of the Services.
        </P>
        <Callout>
          Tally is not a bank, payment institution, money transmitter or licensed financial
          institution. Payment processing is provided through partners licensed to perform those
          activities.
        </Callout>
      </Section>

      <Section id="law" title="Governing law">
        <P>
          These Terms are governed by the laws of <Placeholder label="{{Jurisdiction}}" />, without
          regard to conflict of law principles. Any dispute will be resolved in the courts of the
          same jurisdiction, unless mandatory local law provides otherwise.
        </P>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          <strong>Nesta Business LLC</strong>
          <br />
          Registered address: <Placeholder label="{{Registered Address}}" />
          <br />
          Legal: <Placeholder label="{{Legal Email}}" />
          <br />
          Support: <Placeholder label="{{Support Email}}" />
        </P>
        <Callout>
          These Terms are provided for transparency and should be reviewed by qualified legal
          counsel before publication.
        </Callout>
      </Section>
    </LegalLayout>
  );
}
