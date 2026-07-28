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
const URL = "https://golden-tally-revamp.lovable.app/legal/gdpr";

const toc: TocItem[] = [
  { id: "roles", label: "Controller & processor" },
  { id: "access", label: "Access" },
  { id: "correction", label: "Correction" },
  { id: "deletion", label: "Deletion" },
  { id: "portability", label: "Portability" },
  { id: "objection", label: "Objection" },
  { id: "retention", label: "Retention" },
  { id: "subprocessors", label: "Subprocessors" },
  { id: "transfers", label: "International transfers" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/legal/gdpr")({
  component: GDPRPage,
  head: () => ({
    meta: [
      { title: "GDPR & Privacy — Tally" },
      {
        name: "description",
        content:
          "How Tally supports GDPR and equivalent privacy rights, including access, correction, deletion, portability and objection.",
      },
      { property: "og:title", content: "GDPR & Privacy — Tally" },
      {
        property: "og:description",
        content:
          "Understand your rights and how Nesta Business LLC handles them across the Tally platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function GDPRPage() {
  return (
    <LegalLayout
      eyebrow="Legal · GDPR"
      title="GDPR & Privacy"
      intro="This page explains how Tally, operated by Nesta Business LLC, supports the rights granted by the EU General Data Protection Regulation (GDPR), the UK GDPR and similar privacy frameworks around the world."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="roles" title="Controller & processor">
        <P>
          For personal information about our own website visitors and merchant account holders,
          Nesta Business LLC acts as the data controller. When a merchant uses Tally to serve their
          shoppers, the merchant is generally the controller of that shopper information and Nesta
          Business LLC acts as the processor on the merchant’s behalf.
        </P>
      </Section>

      <Section id="access" title="Access">
        <P>
          You can request confirmation of whether we process personal information about you and,
          where we do, a copy of that information.
        </P>
      </Section>

      <Section id="correction" title="Correction">
        <P>
          You can ask us to correct information that is inaccurate or incomplete. Where possible,
          corrections are made through the dashboard directly.
        </P>
      </Section>

      <Section id="deletion" title="Deletion">
        <P>
          You can ask us to delete your personal information, subject to exceptions such as legal
          recordkeeping or ongoing legitimate interests that we can lawfully continue to rely on.
        </P>
      </Section>

      <Section id="portability" title="Portability">
        <P>
          Where applicable, you can request a portable, machine-readable copy of information you
          provided to us and, where technically feasible, have it transmitted to another provider.
        </P>
      </Section>

      <Section id="objection" title="Objection & restriction">
        <P>
          You can object to certain processing based on legitimate interests and request that we
          restrict processing while we evaluate your request.
        </P>
      </Section>

      <Section id="retention" title="Retention">
        <P>
          Retention periods depend on the category of information and the purpose of processing.
          Detailed information is provided in our{" "}
          <LinkTo to="/legal/privacy">Privacy Policy</LinkTo>.
        </P>
      </Section>

      <Section id="subprocessors" title="Subprocessors">
        <P>
          To operate the Services we engage carefully selected subprocessors — for example, cloud
          hosting, payment processing, fraud prevention, email delivery and analytics providers. A
          current list is available on request to <Placeholder label="{{Privacy Email}}" />.
        </P>
        <Callout>
          Where required, Tally offers a Data Processing Agreement (DPA) to eligible customers.
          Contact <Placeholder label="{{Legal Email}}" /> to request one.
        </Callout>
      </Section>

      <Section id="transfers" title="International transfers">
        <UL>
          <li>
            We use appropriate safeguards for cross-border transfers, including standard contractual
            clauses where required.
          </li>
          <li>
            We perform transfer risk assessments and apply supplementary measures where appropriate.
          </li>
        </UL>
      </Section>

      <Section id="contact" title="Privacy contact">
        <P>
          To exercise any of these rights, email <Placeholder label="{{Privacy Email}}" /> with
          enough information to verify your identity and describe your request. We aim to respond
          within the timeframes required by applicable law.
        </P>
      </Section>
    </LegalLayout>
  );
}
