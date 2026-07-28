import { createFileRoute } from "@tanstack/react-router";
import {
  LegalLayout,
  Section,
  P,
  UL,
  Callout,
  LinkTo,
  type TocItem,
} from "@/components/legal/LegalLayout";

const UPDATED = "January 15, 2026";
const URL = "https://golden-tally-revamp.lovable.app/legal/cookies";

const toc: TocItem[] = [
  { id: "what", label: "What cookies are" },
  { id: "categories", label: "Categories we use" },
  { id: "third-party", label: "Third-party cookies" },
  { id: "duration", label: "Cookie duration" },
  { id: "consent", label: "Consent management" },
  { id: "manage", label: "Change your preferences" },
  { id: "contact", label: "Contact" },
];

export const Route = createFileRoute("/legal/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy — Tally" },
      {
        name: "description",
        content:
          "The cookies Tally uses across our website and dashboard, why we use them, and how to change your preferences at any time.",
      },
      { property: "og:title", content: "Cookie Policy — Tally" },
      {
        property: "og:description",
        content:
          "Understand and control the cookies used by Tally, operated by Nesta Business LLC.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Legal · Cookies"
      title="Cookie Policy"
      intro="This page explains how Tally, operated by Nesta Business LLC, uses cookies and similar technologies on our website and inside the dashboard, and how you can manage your preferences."
      updated={UPDATED}
      toc={toc}
    >
      <Section id="what" title="What cookies are">
        <P>
          Cookies are small text files placed on your device when you visit a website. They allow
          the site to remember your actions and preferences over time. We also use similar
          technologies such as local storage and pixel tags, and we describe them all here under the
          umbrella term “cookies”.
        </P>
      </Section>

      <Section id="categories" title="Categories we use">
        <UL>
          <li>
            <strong>Necessary cookies.</strong> Required for core functionality such as signing you
            in, keeping your session secure and remembering your consent choices. These cannot be
            turned off.
          </li>
          <li>
            <strong>Functional cookies.</strong> Remember preferences such as language, region and
            layout to give you a consistent experience.
          </li>
          <li>
            <strong>Analytics cookies.</strong> Help us understand how visitors interact with the
            site so we can improve navigation, content and performance. Data is aggregated and used
            in a way that does not identify individuals.
          </li>
          <li>
            <strong>Performance cookies.</strong> Measure page load times and uptime signals so we
            can find and fix issues quickly.
          </li>
          <li>
            <strong>Marketing cookies.</strong> Measure the effectiveness of campaigns and, where
            allowed, personalize the content you see on other platforms.
          </li>
        </UL>
      </Section>

      <Section id="third-party" title="Third-party cookies">
        <P>
          Some cookies are set by third parties we work with — for example, analytics providers,
          marketing platforms, and payment or fraud services embedded in checkouts. Their use of
          information is governed by their own privacy notices.
        </P>
      </Section>

      <Section id="duration" title="Cookie duration">
        <UL>
          <li>
            <strong>Session cookies</strong> are removed when you close the browser.
          </li>
          <li>
            <strong>Persistent cookies</strong> stay on your device for a set duration — typically
            from a few days up to 24 months, depending on the purpose.
          </li>
        </UL>
      </Section>

      <Section id="consent" title="Consent management">
        <P>
          When you first visit our website, we ask you to make a choice about cookies. Necessary
          cookies are always active. All other categories are off by default until you accept them
          or enable them individually. We keep a record of your choice so we don’t have to ask again
          on every visit.
        </P>
      </Section>

      <Section id="manage" title="Change your preferences">
        <P>
          You can change your cookie choices at any time by opening the “Manage preferences” panel
          from the cookie banner, or by clearing your browser storage for our site. Most browsers
          also let you block or delete cookies globally.
        </P>
        <Callout>
          For a broader view of how we handle personal information, see our{" "}
          <LinkTo to="/legal/privacy">Privacy Policy</LinkTo>.
        </Callout>
      </Section>

      <Section id="contact" title="Contact">
        <P>
          Questions about cookies? Reach us at the addresses listed on our{" "}
          <LinkTo to="/contact-us">Contact page</LinkTo>.
        </P>
      </Section>
    </LegalLayout>
  );
}
