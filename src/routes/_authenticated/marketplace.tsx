import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Grid3x3,
  Star,
  Sparkles,
  ShieldCheck,
  Download,
  Check,
  Plus,
  X,
  ExternalLink,
  Lock,
  Clock,
  BookOpen,
  Users,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Zap,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Megaphone,
  Truck,
  Wrench,
  Bot,
  DollarSign,
  Headphones,
  Building2,
  Send,
  Info,
  Verified,
  Blocks,
} from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/_authenticated/marketplace")({
  component: MarketplacePage,
  head: () => ({
    meta: [
      { title: "Integrations — Tally" },
      { name: "description", content: "Discover and connect apps to grow your commerce stack." },
      { property: "og:title", content: "Integration Marketplace — Tally" },
      { property: "og:description", content: "Ecommerce, payments, marketing, CRM and more." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* ------------ Data ------------ */

type CatKey =
  | "all"
  | "ecommerce"
  | "payments"
  | "crm"
  | "marketing"
  | "analytics"
  | "accounting"
  | "automation"
  | "shipping"
  | "support"
  | "communication"
  | "developer"
  | "finance"
  | "ai";

type App = {
  id: string;
  name: string;
  cat: CatKey;
  short: string;
  long: string;
  color: string;
  abbr: string;
  verified?: boolean;
  featured?: boolean;
  isNew?: boolean;
  popular?: boolean;
  installs: string;
  rating: number;
  developer: string;
  setup: string;
  permissions: string[];
  features: string[];
};

const APPS: App[] = [
  {
    id: "shopify",
    name: "Shopify",
    cat: "ecommerce",
    short: "Sync orders, products and customers from your Shopify store.",
    long: "Connect your Shopify store to reconcile every order with a Tally payment. Automatic product and customer sync, refund pass-through and inventory hooks.",
    color: "#95BF47",
    abbr: "SH",
    verified: true,
    featured: true,
    popular: true,
    installs: "12,400+",
    rating: 4.9,
    developer: "Tally · Official",
    setup: "~3 min",
    permissions: ["Read orders", "Read customers", "Write refunds"],
    features: ["Order reconciliation", "Refund sync", "Inventory hooks", "Multi-store"],
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    cat: "ecommerce",
    short: "Native plugin for WordPress-powered stores.",
    long: "Add Tally as a payment method in WooCommerce with a single plugin. Supports Apple Pay, SEPA and local methods.",
    color: "#96588A",
    abbr: "WC",
    verified: true,
    featured: true,
    popular: true,
    installs: "8,900+",
    rating: 4.8,
    developer: "Tally · Official",
    setup: "~5 min",
    permissions: ["Manage orders", "Manage checkout"],
    features: ["One-click plugin", "Multi-currency", "Subscriptions"],
  },
  {
    id: "magento",
    name: "Magento",
    cat: "ecommerce",
    short: "Enterprise ecommerce integration for Adobe Commerce.",
    long: "Certified Magento 2 extension with support for multi-store, tax and B2B pricing.",
    color: "#EE672F",
    abbr: "MG",
    verified: true,
    installs: "1,200+",
    rating: 4.6,
    developer: "Tally · Official",
    setup: "~15 min",
    permissions: ["Orders", "Customers", "Products"],
    features: ["B2B pricing", "Multi-store", "Tax rules"],
  },
  {
    id: "bigcommerce",
    name: "BigCommerce",
    cat: "ecommerce",
    short: "Add Tally to your BigCommerce checkout.",
    long: "Approved BigCommerce app with one-click install and hosted checkout support.",
    color: "#121118",
    abbr: "BC",
    verified: true,
    installs: "800+",
    rating: 4.7,
    developer: "Tally · Official",
    setup: "~4 min",
    permissions: ["Orders", "Checkout"],
    features: ["Hosted checkout", "Recurring", "Wallets"],
  },
  {
    id: "prestashop",
    name: "PrestaShop",
    cat: "ecommerce",
    short: "European ecommerce integration.",
    long: "PrestaShop module supporting local European payment methods including Bancontact and iDEAL.",
    color: "#DF0067",
    abbr: "PS",
    installs: "600+",
    rating: 4.5,
    developer: "Community",
    setup: "~10 min",
    permissions: ["Orders", "Payments"],
    features: ["Local methods", "SEPA", "Refunds"],
  },

  {
    id: "stripe",
    name: "Stripe",
    cat: "payments",
    short: "Route payments through Stripe as a backup provider.",
    long: "Use Stripe as a secondary processor for redundancy and geographic optimization.",
    color: "#635BFF",
    abbr: "S",
    verified: true,
    featured: true,
    installs: "22,000+",
    rating: 4.9,
    developer: "Stripe",
    setup: "~2 min",
    permissions: ["Charges", "Refunds"],
    features: ["Failover routing", "Global coverage", "Radar"],
  },
  {
    id: "adyen",
    name: "Adyen",
    cat: "payments",
    short: "Enterprise-grade payment processing.",
    long: "Adyen support for high-volume merchants with advanced risk and issuing.",
    color: "#0ABF53",
    abbr: "AD",
    verified: true,
    popular: true,
    installs: "3,200+",
    rating: 4.8,
    developer: "Adyen",
    setup: "~15 min",
    permissions: ["Payments", "Payouts"],
    features: ["Global acquiring", "Advanced risk", "Terminal"],
  },
  {
    id: "checkout",
    name: "Checkout.com",
    cat: "payments",
    short: "Alternative acquirer for global coverage.",
    long: "Add Checkout.com as an acquirer for regional optimization and higher approval rates.",
    color: "#0E1E3B",
    abbr: "CK",
    verified: true,
    installs: "1,800+",
    rating: 4.6,
    developer: "Checkout.com",
    setup: "~10 min",
    permissions: ["Payments"],
    features: ["Local acquiring", "3DS2", "Tokenization"],
  },
  {
    id: "worldpay",
    name: "Worldpay",
    cat: "payments",
    short: "Global processor from FIS.",
    long: "Enable Worldpay as a payment route for enterprise merchants.",
    color: "#EA1A2C",
    abbr: "WP",
    installs: "900+",
    rating: 4.4,
    developer: "FIS",
    setup: "~20 min",
    permissions: ["Payments"],
    features: ["Global", "Multi-currency"],
  },
  {
    id: "paypal",
    name: "PayPal",
    cat: "payments",
    short: "Accept PayPal and Pay Later at checkout.",
    long: "Add PayPal, Venmo and Pay Later as wallet options in your Tally checkout.",
    color: "#003087",
    abbr: "PP",
    verified: true,
    popular: true,
    installs: "18,000+",
    rating: 4.7,
    developer: "PayPal",
    setup: "~5 min",
    permissions: ["Payments", "Refunds"],
    features: ["PayPal", "Venmo", "Pay Later"],
  },

  {
    id: "hubspot",
    name: "HubSpot",
    cat: "crm",
    short: "Sync customers and revenue into HubSpot.",
    long: "Push every customer, deal and payment into HubSpot CRM for a unified revenue view.",
    color: "#FF7A59",
    abbr: "HB",
    verified: true,
    featured: true,
    installs: "4,500+",
    rating: 4.8,
    developer: "Tally · Official",
    setup: "~4 min",
    permissions: ["Contacts", "Deals"],
    features: ["Contact sync", "Revenue attribution", "Deal automation"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    cat: "crm",
    short: "Enterprise CRM integration.",
    long: "Sync accounts, contacts and opportunities with Salesforce Sales Cloud.",
    color: "#00A1E0",
    abbr: "SF",
    verified: true,
    installs: "2,100+",
    rating: 4.6,
    developer: "Tally · Official",
    setup: "~10 min",
    permissions: ["Accounts", "Opportunities"],
    features: ["Bi-directional sync", "Custom fields", "Reports"],
  },

  {
    id: "zapier",
    name: "Zapier",
    cat: "automation",
    short: "Automate workflows across 6,000+ apps.",
    long: "Trigger workflows in any Zapier-connected tool when payments, refunds or customers change.",
    color: "#FF4A00",
    abbr: "Z",
    verified: true,
    popular: true,
    installs: "9,800+",
    rating: 4.9,
    developer: "Zapier",
    setup: "~2 min",
    permissions: ["Read events"],
    features: ["6000+ apps", "Multi-step Zaps", "Filters"],
  },
  {
    id: "make",
    name: "Make",
    cat: "automation",
    short: "Visual automation for complex workflows.",
    long: "Design multi-step scenarios with Make (formerly Integromat).",
    color: "#6D00CC",
    abbr: "MK",
    installs: "3,100+",
    rating: 4.7,
    developer: "Make",
    setup: "~3 min",
    permissions: ["Events", "Actions"],
    features: ["Visual builder", "Branching", "Data stores"],
  },

  {
    id: "slack",
    name: "Slack",
    cat: "communication",
    short: "Get payment alerts directly in Slack channels.",
    long: "Real-time notifications for successful payments, disputes and payouts in any Slack channel.",
    color: "#4A154B",
    abbr: "SL",
    verified: true,
    popular: true,
    installs: "11,200+",
    rating: 4.9,
    developer: "Slack",
    setup: "~1 min",
    permissions: ["Send messages"],
    features: ["Channel routing", "Slash commands", "Digests"],
  },
  {
    id: "discord",
    name: "Discord",
    cat: "communication",
    short: "Payment webhooks into Discord.",
    long: "Post payment and dispute events to any Discord channel.",
    color: "#5865F2",
    abbr: "DC",
    installs: "1,700+",
    rating: 4.6,
    developer: "Community",
    setup: "~2 min",
    permissions: ["Send messages"],
    features: ["Rich embeds", "Role mentions"],
  },

  {
    id: "meta",
    name: "Meta",
    cat: "marketing",
    short: "Sync purchases into Meta Ads for conversions.",
    long: "Send server-side purchase events to Facebook and Instagram via the Conversions API.",
    color: "#0866FF",
    abbr: "M",
    verified: true,
    isNew: true,
    installs: "5,600+",
    rating: 4.7,
    developer: "Meta",
    setup: "~5 min",
    permissions: ["Send events"],
    features: ["Conversions API", "Value optimization"],
  },
  {
    id: "ga4",
    name: "Google Analytics",
    cat: "analytics",
    short: "Track revenue events in GA4.",
    long: "Automatic GA4 purchase events with enhanced ecommerce parameters.",
    color: "#F9AB00",
    abbr: "GA",
    verified: true,
    featured: true,
    installs: "14,900+",
    rating: 4.8,
    developer: "Google",
    setup: "~3 min",
    permissions: ["Send events"],
    features: ["GA4", "Enhanced ecom", "Server events"],
  },
  {
    id: "gads",
    name: "Google Ads",
    cat: "marketing",
    short: "Send conversions to Google Ads.",
    long: "Enhanced conversions for Google Ads with hashed customer data.",
    color: "#4285F4",
    abbr: "AD",
    verified: true,
    installs: "6,700+",
    rating: 4.7,
    developer: "Google",
    setup: "~4 min",
    permissions: ["Send conversions"],
    features: ["Enhanced conversions", "Offline import"],
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    cat: "marketing",
    short: "Server-side purchase tracking for TikTok.",
    long: "Send purchase events to TikTok Events API for higher ROAS.",
    color: "#010101",
    abbr: "TT",
    isNew: true,
    installs: "2,300+",
    rating: 4.5,
    developer: "TikTok",
    setup: "~5 min",
    permissions: ["Events"],
    features: ["Events API", "Attribution"],
  },

  {
    id: "klaviyo",
    name: "Klaviyo",
    cat: "marketing",
    short: "Trigger email flows from payment events.",
    long: "Sync customers and events into Klaviyo to power abandoned-cart and post-purchase flows.",
    color: "#000000",
    abbr: "KL",
    verified: true,
    popular: true,
    installs: "7,100+",
    rating: 4.9,
    developer: "Klaviyo",
    setup: "~4 min",
    permissions: ["Profiles", "Events"],
    features: ["Event streams", "Segment sync", "Flows"],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    cat: "marketing",
    short: "Sync buyers into Mailchimp lists.",
    long: "Automatically add paying customers to segmented Mailchimp audiences.",
    color: "#FFE01B",
    abbr: "MC",
    installs: "3,900+",
    rating: 4.5,
    developer: "Mailchimp",
    setup: "~3 min",
    permissions: ["Lists"],
    features: ["Audience sync", "Merge fields"],
  },
  {
    id: "segment",
    name: "Segment",
    cat: "analytics",
    short: "Stream all events into Segment.",
    long: "Fan out Tally events to hundreds of downstream destinations via Segment.",
    color: "#52BD94",
    abbr: "SG",
    verified: true,
    installs: "2,800+",
    rating: 4.7,
    developer: "Twilio",
    setup: "~3 min",
    permissions: ["Track events"],
    features: ["Server-side", "Identify + Track"],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    cat: "analytics",
    short: "Product analytics for revenue events.",
    long: "Feed Mixpanel with rich revenue and cohort data.",
    color: "#7856FF",
    abbr: "MP",
    installs: "1,600+",
    rating: 4.6,
    developer: "Mixpanel",
    setup: "~3 min",
    permissions: ["Track", "Identify"],
    features: ["Cohorts", "Funnels"],
  },
  {
    id: "posthog",
    name: "PostHog",
    cat: "analytics",
    short: "Open-source product analytics.",
    long: "Send events to PostHog Cloud or self-hosted instances.",
    color: "#F54E00",
    abbr: "PH",
    isNew: true,
    installs: "1,200+",
    rating: 4.8,
    developer: "PostHog",
    setup: "~2 min",
    permissions: ["Capture"],
    features: ["Self-host", "Session replay"],
  },

  {
    id: "quickbooks",
    name: "QuickBooks",
    cat: "accounting",
    short: "Sync payments into QuickBooks Online.",
    long: "Automatic journal entries for every Tally settlement.",
    color: "#2CA01C",
    abbr: "QB",
    verified: true,
    installs: "4,200+",
    rating: 4.7,
    developer: "Intuit",
    setup: "~6 min",
    permissions: ["Journal entries"],
    features: ["Auto-journals", "Multi-currency"],
  },
  {
    id: "xero",
    name: "Xero",
    cat: "accounting",
    short: "Bookkeeping automation with Xero.",
    long: "Reconcile Tally payouts against Xero bank feeds with zero manual work.",
    color: "#13B5EA",
    abbr: "XE",
    verified: true,
    installs: "3,700+",
    rating: 4.8,
    developer: "Xero",
    setup: "~5 min",
    permissions: ["Invoices", "Bank feeds"],
    features: ["Bank reconciliation", "Invoicing"],
  },
  {
    id: "netsuite",
    name: "NetSuite",
    cat: "accounting",
    short: "Enterprise ERP integration.",
    long: "SuiteCloud module for revenue recognition and multi-entity accounting.",
    color: "#125EA3",
    abbr: "NS",
    installs: "500+",
    rating: 4.4,
    developer: "Tally · Official",
    setup: "~30 min",
    permissions: ["Records", "Transactions"],
    features: ["Multi-entity", "RevRec"],
  },

  {
    id: "zendesk",
    name: "Zendesk",
    cat: "support",
    short: "Attach payment context to support tickets.",
    long: "Show a customer's full payment history inside every Zendesk ticket.",
    color: "#03363D",
    abbr: "ZD",
    verified: true,
    installs: "2,400+",
    rating: 4.7,
    developer: "Zendesk",
    setup: "~4 min",
    permissions: ["Tickets"],
    features: ["Sidebar app", "Macros"],
  },
  {
    id: "intercom",
    name: "Intercom",
    cat: "support",
    short: "Customer messaging with payment context.",
    long: "Enrich Intercom conversations with lifetime value and recent payments.",
    color: "#1F8DED",
    abbr: "IN",
    verified: true,
    installs: "3,100+",
    rating: 4.8,
    developer: "Intercom",
    setup: "~3 min",
    permissions: ["Contacts", "Conversations"],
    features: ["Inbox app", "Attributes"],
  },

  {
    id: "github",
    name: "GitHub",
    cat: "developer",
    short: "Deploy webhooks from GitHub Actions.",
    long: "Trigger deploys and rollbacks based on payment health signals.",
    color: "#0D1117",
    abbr: "GH",
    installs: "1,900+",
    rating: 4.6,
    developer: "GitHub",
    setup: "~2 min",
    permissions: ["Repos", "Actions"],
    features: ["Actions", "Deploy alerts"],
  },
  {
    id: "vercel",
    name: "Vercel",
    cat: "developer",
    short: "Ship checkout updates from Vercel.",
    long: "Preview checkout branding on every Vercel deployment.",
    color: "#000000",
    abbr: "V",
    isNew: true,
    installs: "1,100+",
    rating: 4.7,
    developer: "Vercel",
    setup: "~2 min",
    permissions: ["Deployments"],
    features: ["Preview URLs", "Analytics"],
  },
  {
    id: "openai",
    name: "OpenAI",
    cat: "ai",
    short: "Bring your own OpenAI key for Tally AI.",
    long: "Use your own OpenAI account for private Tally AI copilots.",
    color: "#10A37F",
    abbr: "AI",
    featured: true,
    isNew: true,
    installs: "3,400+",
    rating: 4.9,
    developer: "OpenAI",
    setup: "~1 min",
    permissions: ["API access"],
    features: ["BYO key", "Model choice"],
  },
  {
    id: "custom",
    name: "Custom API",
    cat: "developer",
    short: "Build your own via our REST API.",
    long: "Not seeing what you need? Build directly against the Tally REST API and webhooks.",
    color: "#111827",
    abbr: "{ }",
    installs: "—",
    rating: 5.0,
    developer: "Tally",
    setup: "Flexible",
    permissions: ["Custom scopes"],
    features: ["Full REST API", "Webhooks", "SDKs"],
  },
];

const CATEGORIES: { key: CatKey; label: string; icon: typeof Grid3x3 }[] = [
  { key: "all", label: "All apps", icon: Grid3x3 },
  { key: "ecommerce", label: "Ecommerce", icon: ShoppingBag },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "crm", label: "CRM", icon: Users },
  { key: "marketing", label: "Marketing", icon: Megaphone },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "accounting", label: "Accounting", icon: DollarSign },
  { key: "automation", label: "Automation", icon: Zap },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "support", label: "Support", icon: Headphones },
  { key: "communication", label: "Communication", icon: MessageSquare },
  { key: "developer", label: "Developer tools", icon: Wrench },
  { key: "finance", label: "Finance", icon: Building2 },
  { key: "ai", label: "AI", icon: Bot },
];

/* ------------ Page ------------ */

function MarketplacePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatKey | "connected" | "new" | "popular">("all");
  const [selected, setSelected] = useState<App | null>(null);
  const [showRequest, setShowRequest] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return APPS.filter((a) => {
      if (cat === "connected") return false; // brand new merchant → nothing connected
      if (cat === "new") return !!a.isNew;
      if (cat === "popular") return !!a.popular;
      if (cat !== "all" && a.cat !== cat) return false;
      if (!query) return true;
      return (
        a.name.toLowerCase().includes(query) ||
        a.short.toLowerCase().includes(query) ||
        a.cat.toLowerCase().includes(query)
      );
    });
  }, [q, cat]);

  const featured = APPS.filter((a) => a.featured).slice(0, 4);
  const newReleases = APPS.filter((a) => a.isNew).slice(0, 6);

  return (
    <AppShell>
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Integrations"
          description="Connect your favorite tools to automate operations, unify customer data and grow revenue."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <SecondaryButton>
                <Blocks className="mr-1.5 h-3.5 w-3.5" /> Connected apps
                <span
                  className="ml-2 rounded-full px-1.5 py-0.5 text-[10px]"
                  style={{ background: T.bg, color: T.textMuted }}
                >
                  0
                </span>
              </SecondaryButton>
              <PrimaryButton onClick={() => setShowRequest(true)}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Request integration
              </PrimaryButton>
            </div>
          }
        />

        {/* Search */}
        <div
          className="mt-6 flex items-center gap-2 rounded-2xl px-4 py-3 transition-all focus-within:ring-4 focus-within:ring-[#DBEAFE]"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <Search className="h-4.5 w-4.5 shrink-0" style={{ color: T.textMuted }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search integrations — Shopify, Slack, analytics, payments…"
            className="flex-1 bg-transparent text-[14px] outline-none"
            style={{ color: T.text }}
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="grid h-6 w-6 place-items-center rounded transition-colors"
              style={{ color: T.textMuted }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span
            className="hidden items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium sm:flex"
            style={{ background: T.bg, color: T.textMuted, border: `1px solid ${T.border}` }}
          >
            {filtered.length} apps
          </span>
        </div>

        {/* Body */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Sidebar cat={cat} onChange={setCat} />

          <div className="min-w-0">
            {/* Featured hero — hidden when actively searching */}
            {!q && cat === "all" && <FeaturedHero apps={featured} onOpen={setSelected} />}

            {!q && cat === "all" && newReleases.length > 0 && (
              <CarouselSection
                title="New releases"
                tag="Fresh"
                apps={newReleases}
                onOpen={setSelected}
              />
            )}

            {/* Grid */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold" style={{ color: T.text }}>
                    {cat === "all"
                      ? "All integrations"
                      : cat === "connected"
                        ? "Connected apps"
                        : cat === "new"
                          ? "New releases"
                          : cat === "popular"
                            ? "Most popular"
                            : (CATEGORIES.find((c) => c.key === cat)?.label ?? "")}
                  </h3>
                  <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                    {filtered.length} apps · {q ? `matching "${q}"` : "sorted by relevance"}
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                >
                  <Filter className="h-3 w-3" /> Sort
                </button>
              </div>

              {cat === "connected" ? (
                <ConnectedEmpty onBrowse={() => setCat("all")} />
              ) : filtered.length === 0 ? (
                <NoResults
                  onClear={() => {
                    setQ("");
                    setCat("all");
                  }}
                  onRequest={() => setShowRequest(true)}
                />
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((a) => (
                    <AppCard key={a.id} app={a} onOpen={() => setSelected(a)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && <AppDrawer app={selected} onClose={() => setSelected(null)} />}
      {showRequest && <RequestModal onClose={() => setShowRequest(false)} />}
    </AppShell>
  );
}

/* ------------ Sidebar ------------ */

function Sidebar({ cat, onChange }: { cat: string; onChange: (c: any) => void }) {
  return (
    <aside
      className="sticky top-4 h-fit rounded-2xl p-2"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        Discover
      </div>
      {[
        { key: "all", label: "All apps", icon: Grid3x3 },
        { key: "popular", label: "Popular", icon: Star },
        { key: "new", label: "Recently added", icon: Sparkles },
        { key: "connected", label: "Connected", icon: Check },
      ].map((row) => {
        const Icon = row.icon;
        const active = cat === row.key;
        return (
          <button
            key={row.key}
            onClick={() => onChange(row.key)}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-all"
            style={{
              background: active ? "#EFF6FF" : "transparent",
              color: active ? T.blue : T.text,
              fontWeight: active ? 600 : 500,
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = T.bg;
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: active ? T.blue : T.textMuted }} />
            <span className="flex-1 text-left">{row.label}</span>
            {row.key === "connected" && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold"
                style={{ background: T.bg, color: T.textMuted }}
              >
                0
              </span>
            )}
          </button>
        );
      })}

      <div className="mx-2 my-2 h-px" style={{ background: T.border }} />
      <div
        className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        Categories
      </div>
      {CATEGORIES.filter((c) => c.key !== "all").map((c) => {
        const Icon = c.icon;
        const active = cat === c.key;
        const count = APPS.filter((a) => a.cat === c.key).length;
        return (
          <button
            key={c.key}
            onClick={() => onChange(c.key)}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12.5px] transition-all"
            style={{
              background: active ? "#EFF6FF" : "transparent",
              color: active ? T.blue : T.text,
              fontWeight: active ? 600 : 500,
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = T.bg;
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: active ? T.blue : T.textMuted }} />
            <span className="flex-1 text-left">{c.label}</span>
            <span
              className="rounded-full px-1.5 py-0.5 text-[9.5px]"
              style={{ background: T.bg, color: T.textMuted }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </aside>
  );
}

/* ------------ Featured ------------ */

function FeaturedHero({ apps, onOpen }: { apps: App[]; onOpen: (a: App) => void }) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6"
      style={{
        background: "linear-gradient(135deg, #F8FAFF 0%, #FFFFFF 60%, #F5F3FF 100%)",
        border: `1px solid ${T.border}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.18), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.15), transparent)" }}
      />

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.blue }}
          >
            <Sparkles className="h-3 w-3" /> Featured for new merchants
          </div>
          <h3 className="mt-3 text-[20px] font-semibold sm:text-[22px]" style={{ color: T.text }}>
            Recommended stack to launch fast
          </h3>
          <p className="mt-1 max-w-lg text-[13px]" style={{ color: T.textMuted }}>
            Start with an ecommerce platform, a marketing channel and an analytics tool. You can add
            more anytime.
          </p>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {apps.map((a) => (
          <button
            key={a.id}
            onClick={() => onOpen(a)}
            className="group flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all hover:-translate-y-0.5"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="flex w-full items-center justify-between">
              <AppLogo app={a} size={36} />
              {a.verified && <VerifiedBadge />}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[14px] font-semibold" style={{ color: T.text }}>
                {a.name}
              </span>
            </div>
            <div className="text-[11.5px] leading-relaxed" style={{ color: T.textMuted }}>
              {a.short}
            </div>
            <span
              className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium"
              style={{ color: T.blue }}
            >
              Connect{" "}
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function CarouselSection({
  title,
  tag,
  apps,
  onOpen,
}: {
  title: string;
  tag: string;
  apps: App[];
  onOpen: (a: App) => void;
}) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold" style={{ color: T.text }}>
            {title}
          </h3>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
            style={{ background: "#EEF2FF", color: "#4338CA" }}
          >
            {tag}
          </span>
        </div>
      </div>
      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
        {apps.map((a) => (
          <button
            key={a.id}
            onClick={() => onOpen(a)}
            className="group flex w-64 shrink-0 snap-start flex-col gap-2 rounded-xl p-4 text-left transition-all hover:-translate-y-0.5"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="flex items-center justify-between">
              <AppLogo app={a} size={32} />
              <span
                className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold"
                style={{ background: "#F0FDF4", color: "#166534" }}
              >
                New
              </span>
            </div>
            <div className="text-[13.5px] font-semibold" style={{ color: T.text }}>
              {a.name}
            </div>
            <div className="line-clamp-2 text-[11.5px]" style={{ color: T.textMuted }}>
              {a.short}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ------------ App Card ------------ */

function AppCard({ app, onOpen }: { app: App; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group flex cursor-pointer flex-col gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 30px rgba(17,17,17,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <AppLogo app={app} size={40} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-semibold" style={{ color: T.text }}>
                {app.name}
              </span>
              {app.verified && <VerifiedBadge small />}
            </div>
            <div className="text-[11px] capitalize" style={{ color: T.textFaint }}>
              {app.cat === "developer" ? "Developer tools" : app.cat}
            </div>
          </div>
        </div>
        {app.isNew && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold"
            style={{ background: "#F0FDF4", color: "#166534" }}
          >
            New
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-[12.5px] leading-relaxed" style={{ color: T.textMuted }}>
        {app.short}
      </p>

      <div className="flex items-center gap-3 text-[11px]" style={{ color: T.textMuted }}>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" style={{ color: "#F59E0B" }} />
          <span className="font-medium" style={{ color: T.text }}>
            {app.rating.toFixed(1)}
          </span>
        </span>
        <span style={{ color: T.textFaint }}>·</span>
        <span className="flex items-center gap-1">
          <Download className="h-3 w-3" /> {app.installs}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
        >
          <span
            className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: T.textFaint }}
          />
          Not connected
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.03]"
          style={{ background: T.blue }}
        >
          Connect <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

const APP_DOMAINS: Record<string, string> = {
  shopify: "shopify.com",
  woocommerce: "woocommerce.com",
  magento: "magento.com",
  bigcommerce: "bigcommerce.com",
  prestashop: "prestashop.com",
  stripe: "stripe.com",
  adyen: "adyen.com",
  checkout: "checkout.com",
  worldpay: "worldpay.com",
  paypal: "paypal.com",
  hubspot: "hubspot.com",
  salesforce: "salesforce.com",
  zapier: "zapier.com",
  make: "make.com",
  slack: "slack.com",
  discord: "discord.com",
  meta: "meta.com",
  ga4: "analytics.google.com",
  gads: "ads.google.com",
  tiktok: "tiktok.com",
  klaviyo: "klaviyo.com",
  mailchimp: "mailchimp.com",
  segment: "segment.com",
  mixpanel: "mixpanel.com",
  posthog: "posthog.com",
  quickbooks: "quickbooks.intuit.com",
  xero: "xero.com",
  netsuite: "netsuite.com",
  zendesk: "zendesk.com",
  intercom: "intercom.com",
  github: "github.com",
  vercel: "vercel.com",
  openai: "openai.com",
  custom: "tally.so",
};

function AppLogo({ app, size = 40 }: { app: App; size?: number }) {
  const domain = APP_DOMAINS[app.id] ?? `${app.id}.com`;
  return <BrandLogo domain={domain} name={app.name} size={size} rounded={12} />;
}

function VerifiedBadge({ small }: { small?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold"
      style={{
        background: "#EFF6FF",
        color: T.blue,
        fontSize: small ? 9 : 10,
      }}
      title="Verified by Tally"
    >
      <Verified className="h-2.5 w-2.5" /> {small ? "" : "Verified"}
    </span>
  );
}

/* ------------ Empty states ------------ */

function ConnectedEmpty({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-10 text-center"
      style={{ background: T.card, border: `1px dashed ${T.border}` }}
    >
      <div
        className="grid h-16 w-16 place-items-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)",
          border: `1px solid ${T.border}`,
        }}
      >
        <Blocks className="h-7 w-7" style={{ color: T.blue }} />
      </div>
      <div>
        <div className="text-[16px] font-semibold" style={{ color: T.text }}>
          Connect your first integration
        </div>
        <div
          className="mx-auto mt-1 max-w-md text-[13px] leading-relaxed"
          style={{ color: T.textMuted }}
        >
          Start with your ecommerce platform and a payment provider — most merchants are up and
          running in under 5 minutes.
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <PrimaryButton onClick={onBrowse}>
          <Grid3x3 className="mr-1.5 h-3.5 w-3.5" /> Browse integrations
        </PrimaryButton>
        <SecondaryButton>
          <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Integration guide
        </SecondaryButton>
      </div>
    </div>
  );
}

function NoResults({ onClear, onRequest }: { onClear: () => void; onRequest: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-2xl p-10 text-center"
      style={{ background: T.card, border: `1px dashed ${T.border}` }}
    >
      <div
        className="grid h-12 w-12 place-items-center rounded-xl"
        style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
      >
        <Search className="h-5 w-5" />
      </div>
      <div className="text-[14px] font-semibold" style={{ color: T.text }}>
        No matching integrations
      </div>
      <div className="max-w-sm text-[12.5px]" style={{ color: T.textMuted }}>
        Try a different keyword, or request the integration you need — we prioritize the
        most-requested tools every month.
      </div>
      <div className="mt-1 flex gap-2">
        <SecondaryButton onClick={onClear}>Clear filters</SecondaryButton>
        <PrimaryButton onClick={onRequest}>Request integration</PrimaryButton>
      </div>
    </div>
  );
}

/* ------------ Drawer ------------ */

function AppDrawer({ app, onClose }: { app: App; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "auth" | "permissions" | "config" | "success">(
    "details",
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex justify-end"
      style={{ background: "rgba(15,15,25,0.45)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-[560px] flex-col overflow-hidden"
        style={{
          background: T.card,
          borderLeft: `1px solid ${T.border}`,
          animation: "mp-slide 260ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes mp-slide { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
          @keyframes mp-check { 0% { transform: scale(0); opacity: 0 } 60% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
          @keyframes mp-fill { from { width: 0% } to { width: 100% } }
        `}</style>

        {/* Header */}
        <div
          className="flex items-start justify-between gap-3 p-5"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-3">
            <AppLogo app={app} size={44} />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[16px] font-semibold" style={{ color: T.text }}>
                  {app.name}
                </h3>
                {app.verified && <VerifiedBadge small />}
              </div>
              <div className="mt-0.5 text-[11.5px]" style={{ color: T.textMuted }}>
                {app.developer} ·{" "}
                <span className="capitalize">
                  {app.cat === "developer" ? "Developer tools" : app.cat}
                </span>
              </div>
              <div
                className="mt-1 flex items-center gap-2 text-[11px]"
                style={{ color: T.textMuted }}
              >
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" style={{ color: "#F59E0B" }} />
                  <span className="font-medium" style={{ color: T.text }}>
                    {app.rating.toFixed(1)}
                  </span>
                </span>
                <span style={{ color: T.textFaint }}>·</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" /> {app.installs}
                </span>
                <span style={{ color: T.textFaint }}>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Setup {app.setup}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === "details" && <DetailsBody app={app} />}
          {step !== "details" && step !== "success" && <ConnectFlow app={app} step={step} />}
          {step === "success" && <SuccessBody app={app} />}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-2 p-4"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          {step === "details" && (
            <>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[12px] font-medium"
                style={{ color: T.blue }}
              >
                <BookOpen className="h-3.5 w-3.5" /> Documentation{" "}
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <PrimaryButton onClick={() => setStep("auth")}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Connect {app.name}
              </PrimaryButton>
            </>
          )}
          {step === "auth" && (
            <StepFooter
              back={() => setStep("details")}
              next={() => setStep("permissions")}
              nextLabel="Authorize"
            />
          )}
          {step === "permissions" && (
            <StepFooter
              back={() => setStep("auth")}
              next={() => setStep("config")}
              nextLabel="Approve permissions"
            />
          )}
          {step === "config" && (
            <StepFooter
              back={() => setStep("permissions")}
              next={() => setStep("success")}
              nextLabel="Finish setup"
            />
          )}
          {step === "success" && (
            <>
              <span className="text-[12px]" style={{ color: T.textMuted }}>
                {app.name} is ready to use.
              </span>
              <PrimaryButton onClick={onClose}>Done</PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StepFooter({
  back,
  next,
  nextLabel,
}: {
  back: () => void;
  next: () => void;
  nextLabel: string;
}) {
  return (
    <>
      <SecondaryButton onClick={back}>Back</SecondaryButton>
      <PrimaryButton onClick={next}>{nextLabel}</PrimaryButton>
    </>
  );
}

function DetailsBody({ app }: { app: App }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Screenshots */}
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="aspect-[16/10] overflow-hidden rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${app.color}22, ${app.color}08)`,
              border: `1px solid ${T.border}`,
            }}
          >
            <div className="grid h-full place-items-center">
              <AppLogo app={app} size={44} />
            </div>
          </div>
        ))}
      </div>

      <section>
        <SectionLabel>About</SectionLabel>
        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: T.text }}>
          {app.long}
        </p>
      </section>

      <section>
        <SectionLabel>Key features</SectionLabel>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {app.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-[12.5px]"
              style={{ color: T.textMuted }}
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#16A34A" }} />
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Permissions</SectionLabel>
        <div
          className="mt-2 rounded-xl p-3"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <div
            className="flex items-center gap-1.5 text-[11px] font-semibold"
            style={{ color: T.textMuted }}
          >
            <Lock className="h-3 w-3" /> {app.name} will be allowed to
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {app.permissions.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-[12.5px]"
                style={{ color: T.text }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.blue }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <MetaRow icon={ShieldCheck} label="Privacy" value="GDPR & SOC 2" />
        <MetaRow icon={Users} label="Developer" value={app.developer} />
        <MetaRow icon={Clock} label="Setup time" value={app.setup} />
        <MetaRow icon={Info} label="Version" value="2026.07" />
      </section>

      {/* Recommendations */}
      <section>
        <SectionLabel>Merchants also connect</SectionLabel>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {APPS.filter((a) => a.id !== app.id && a.verified)
            .slice(0, 3)
            .map((a) => (
              <div
                key={a.id}
                className="flex flex-col items-center gap-1 rounded-lg p-2"
                style={{ background: T.bg, border: `1px solid ${T.border}` }}
              >
                <AppLogo app={a} size={28} />
                <span className="truncate text-[11px] font-medium" style={{ color: T.text }}>
                  {a.name}
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] font-semibold uppercase tracking-wider"
      style={{ color: T.textFaint }}
    >
      {children}
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Info;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg p-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <div
        className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 text-[12.5px] font-medium" style={{ color: T.text }}>
        {value}
      </div>
    </div>
  );
}

function ConnectFlow({ app, step }: { app: App; step: "auth" | "permissions" | "config" }) {
  const stepIdx = step === "auth" ? 0 : step === "permissions" ? 1 : 2;
  return (
    <div className="flex flex-col gap-5">
      <StepIndicator index={stepIdx} labels={["Authenticate", "Permissions", "Configure"]} />

      {step === "auth" && (
        <div
          className="flex flex-col items-center gap-3 rounded-2xl p-8 text-center"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <AppLogo app={app} size={56} />
          <div className="text-[14px] font-semibold" style={{ color: T.text }}>
            Sign in to {app.name}
          </div>
          <div className="max-w-sm text-[12.5px]" style={{ color: T.textMuted }}>
            You'll be redirected to {app.name} to grant Tally access. We never store your password.
          </div>
        </div>
      )}

      {step === "permissions" && (
        <div className="flex flex-col gap-2">
          <div className="text-[13px] font-semibold" style={{ color: T.text }}>
            Review permissions
          </div>
          {app.permissions.map((p) => (
            <div
              key={p}
              className="flex items-center justify-between rounded-lg p-3"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
                <span className="text-[12.5px]" style={{ color: T.text }}>
                  {p}
                </span>
              </div>
              <Check className="h-4 w-4" style={{ color: "#16A34A" }} />
            </div>
          ))}
        </div>
      )}

      {step === "config" && (
        <div className="flex flex-col gap-3">
          <label className="text-[12px] font-medium" style={{ color: T.text }}>
            Sync mode
            <select
              className="mt-1 w-full rounded-lg px-3 py-2 text-[13px] outline-none"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
            >
              <option>Real-time (recommended)</option>
              <option>Hourly</option>
              <option>Daily</option>
            </select>
          </label>
          <label className="text-[12px] font-medium" style={{ color: T.text }}>
            Environment
            <select
              className="mt-1 w-full rounded-lg px-3 py-2 text-[13px] outline-none"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
            >
              <option>Sandbox</option>
              <option>Production</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ index, labels }: { index: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => {
        const done = i < index;
        const active = i === index;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className="grid h-6 w-6 place-items-center rounded-full text-[10.5px] font-semibold transition-all"
              style={{
                background: done ? "#DCFCE7" : active ? T.blue : T.bg,
                color: done ? "#166534" : active ? "#fff" : T.textMuted,
                border: `1px solid ${done ? "#BBF7D0" : active ? T.blue : T.border}`,
              }}
            >
              {done ? <Check className="h-3 w-3" /> : i + 1}
            </div>
            <span
              className="text-[11.5px] font-medium"
              style={{ color: active ? T.text : T.textMuted }}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <div className="ml-2 h-px flex-1" style={{ background: T.border }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SuccessBody({ app }: { app: App }) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-8 text-center"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <div
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{
          background: "#DCFCE7",
          color: "#166534",
          animation: "mp-check 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Check className="h-8 w-8" />
      </div>
      <div>
        <div className="text-[16px] font-semibold" style={{ color: T.text }}>
          {app.name} connected
        </div>
        <div className="mt-1 max-w-sm text-[12.5px]" style={{ color: T.textMuted }}>
          Data will start syncing within a minute. You can manage this integration anytime from the
          Connected tab.
        </div>
      </div>

      <div className="w-full">
        <div
          className="mb-1 flex items-center justify-between text-[11px]"
          style={{ color: T.textMuted }}
        >
          <span>Initial sync</span>
          <span>~1 min</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: "0%", background: T.blue, animation: "mp-fill 60s linear forwards" }}
          />
        </div>
      </div>

      <div className="w-full">
        <div
          className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          <Sparkles className="h-3 w-3" style={{ color: T.blue }} /> Recommended next
        </div>
        <div className="grid grid-cols-3 gap-2">
          {APPS.filter((a) => a.id !== app.id)
            .slice(0, 3)
            .map((a) => (
              <div
                key={a.id}
                className="flex flex-col items-center gap-1 rounded-lg p-2"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
              >
                <AppLogo app={a} size={26} />
                <span className="truncate text-[10.5px] font-medium" style={{ color: T.text }}>
                  {a.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* ------------ Request Modal ------------ */

function RequestModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(15,15,25,0.45)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] overflow-hidden rounded-2xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          animation: "mp-slide 220ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="flex items-start justify-between gap-3 p-5"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div>
            <div className="text-[15px] font-semibold" style={{ color: T.text }}>
              Request an integration
            </div>
            <div className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
              Tell us what you'd like to connect and we'll prioritize based on demand.
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ color: T.textMuted }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <div
              className="grid h-14 w-14 place-items-center rounded-full"
              style={{
                background: "#DCFCE7",
                color: "#166534",
                animation: "mp-check 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <Check className="h-7 w-7" />
            </div>
            <div className="text-[14px] font-semibold" style={{ color: T.text }}>
              Request received
            </div>
            <div className="max-w-sm text-[12.5px]" style={{ color: T.textMuted }}>
              Thanks — our partnerships team will follow up if we need more context.
            </div>
            <PrimaryButton onClick={onClose}>Close</PrimaryButton>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-3 p-5"
          >
            <Field label="Integration name" placeholder="e.g. Klarna, Attentive…" />
            <Field label="Website" placeholder="https://" type="url" />
            <div>
              <label className="text-[12px] font-medium" style={{ color: T.text }}>
                Use case
              </label>
              <textarea
                required
                rows={3}
                placeholder="What would you like to automate or connect?"
                className="mt-1 w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
              />
            </div>
            <Field label="Business need" placeholder="What outcome are you trying to achieve?" />
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
              style={{ background: T.blue }}
            >
              <Send className="h-3.5 w-3.5" /> Submit request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[12px] font-medium" style={{ color: T.text }}>
        {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg px-3 py-2 text-[13px] outline-none"
        style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
      />
    </div>
  );
}
