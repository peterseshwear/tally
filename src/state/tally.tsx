"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Tab = "home" | "payments" | "payouts" | "disputes" | "settings";
export type ChargeStage = "amount" | "processing" | "done";
export type PaymentStatus = "Paid" | "Refunded" | "Disputed";
export type DisplayStatus = PaymentStatus | "Response submitted";
export type RailKey = "stripeOn" | "adyenOn";
export type StoreKey = "shopify" | "woo";

export interface Payment {
  id: number;
  cents: number;
  desc: string;
  method: string;
  status: PaymentStatus;
  time: string;
  /** Processor-side id (e.g. Stripe PaymentIntent id) when the charge hit a real rail. */
  processorId?: string;
}

export type DisplayPayment = Omit<Payment, "status"> & { status: DisplayStatus };

export const BIZ_TYPES = [
  { name: "Food & drink", hint: "Café, restaurant, food truck" },
  { name: "Retail", hint: "Shop, market stall, pop-up" },
  { name: "Services", hint: "Salon, repair, cleaning, tutoring" },
  { name: "Something else", hint: "Tell us in the next step" },
] as const;

export const OB_STEP_LABELS = ["About you", "Your business", "Identity", "Payouts"] as const;

/** Pending payout amounts (prototype fixtures). Instant payout nets a 1% fee. */
export const PAYOUT_CENTS = 128406;
export const PAYOUT_INSTANT_NET_CENTS = 127122;

const SEED_PAYMENTS: Payment[] = [
  { id: 1, cents: 1850, desc: "Tap to Pay · Visa •• 4242", method: "Tap to Pay", status: "Paid", time: "9:41 AM" },
  { id: 2, cents: 4200, desc: "Payment link · Catering deposit", method: "Payment link", status: "Paid", time: "9:12 AM" },
  { id: 3, cents: 675, desc: "QR code · Amex •• 1005", method: "QR code", status: "Refunded", time: "8:58 AM" },
  { id: 4, cents: 2450, desc: "Tap to Pay · Mastercard •• 3311", method: "Tap to Pay", status: "Paid", time: "Yesterday" },
  { id: 5, cents: 1125, desc: "Shopify · order #1041", method: "Shopify", status: "Paid", time: "Yesterday" },
  { id: 6, cents: 8900, desc: "Payment link · Private event", method: "Payment link", status: "Paid", time: "Jul 17" },
  { id: 7, cents: 12000, desc: "Online checkout · Mastercard •• 8830", method: "Online checkout", status: "Disputed", time: "Jul 12" },
  { id: 8, cents: 1575, desc: "Tap to Pay · Visa •• 9902", method: "Tap to Pay", status: "Paid", time: "Jul 12" },
];

export function money(cents: number): string {
  return "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 });
}

/** 2.6% + 10¢ per payment. */
export function feeCents(cents: number): number {
  return Math.round(cents * 0.026) + 10;
}

export function pillClass(status: DisplayStatus): string {
  const variant = {
    Paid: "pill--paid",
    Refunded: "pill--refunded",
    Disputed: "pill--disputed",
    "Response submitted": "pill--submitted",
  }[status];
  return `pill ${variant}`;
}

interface TallyContextValue {
  // Onboarding
  entered: boolean;
  obStep: number;
  biz: number;
  pickBiz: (i: number) => void;
  obNext: () => void;
  obBack: () => void;
  // Navigation
  tab: Tab;
  go: (t: Tab) => void;
  // Payments (dispute display status already applied)
  payments: DisplayPayment[];
  selId: number | null;
  openDetail: (id: number) => void;
  closeDetail: () => void;
  refundSelected: () => void;
  // New charge
  chargeOpen: boolean;
  chargeStage: ChargeStage;
  cents: number;
  openCharge: () => void;
  closeCharge: () => void;
  tapKey: (k: string) => void;
  tapToPay: () => void;
  newSale: () => void;
  // Payouts
  instantDone: boolean;
  sendInstant: () => void;
  // Disputes
  evidence: boolean[];
  toggleEvidence: (i: number) => void;
  dispSubmitted: boolean;
  submitDispute: () => void;
  // Settings
  stripeOn: boolean;
  adyenOn: boolean;
  shopify: boolean;
  woo: boolean;
  toggleRail: (k: RailKey) => void;
  toggleStore: (k: StoreKey) => void;
}

const TallyContext = createContext<TallyContextValue | null>(null);

export function useTally(): TallyContextValue {
  const ctx = useContext(TallyContext);
  if (!ctx) throw new Error("useTally must be used within TallyProvider");
  return ctx;
}

const MAX_CENTS = 99999999;

export function TallyProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [obStep, setObStep] = useState(0);
  const [biz, setBiz] = useState(0);
  const [tab, setTab] = useState<Tab>("home");
  const [rawPayments, setRawPayments] = useState<Payment[]>(SEED_PAYMENTS);
  const [selId, setSelId] = useState<number | null>(null);
  const [chargeOpen, setChargeOpen] = useState(false);
  const [chargeStage, setChargeStage] = useState<ChargeStage>("amount");
  const [cents, setCents] = useState(0);
  const [instantDone, setInstantDone] = useState(false);
  const [evidence, setEvidence] = useState([false, false, false]);
  const [dispSubmitted, setDispSubmitted] = useState(false);
  const [stripeOn, setStripeOn] = useState(true);
  const [adyenOn, setAdyenOn] = useState(true);
  const [shopify, setShopify] = useState(true);
  const [woo, setWoo] = useState(false);

  const payments: DisplayPayment[] = rawPayments.map((p) =>
    p.status === "Disputed" && dispSubmitted ? { ...p, status: "Response submitted" } : p,
  );

  // Creates a real test-mode charge via /api/charges when the backend has a
  // processor configured; otherwise falls back to the prototype's simulation.
  // The processing stage always shows for at least 1.6s (prototype timing).
  const tapToPay = () => {
    if (cents === 0) return;
    setChargeStage("processing");
    const started = Date.now();
    fetch("/api/charges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cents, description: "Tap to Pay · Visa •• 4242" }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
      .then((data: { id?: string } | null) => {
        const remaining = Math.max(0, 1600 - (Date.now() - started));
        window.setTimeout(() => {
          setRawPayments((prev) => [
            {
              id: Date.now(),
              cents,
              desc: "Tap to Pay · Visa •• 4242",
              method: "Tap to Pay",
              status: "Paid",
              time: "Just now",
              processorId: data?.id,
            },
            ...prev,
          ]);
          setChargeStage("done");
        }, remaining);
      });
  };

  const value: TallyContextValue = {
    entered,
    obStep,
    biz,
    pickBiz: setBiz,
    obNext: () => (obStep < 3 ? setObStep(obStep + 1) : setEntered(true)),
    obBack: () => setObStep((s) => Math.max(0, s - 1)),
    tab,
    go: setTab,
    payments,
    selId,
    openDetail: (id) => {
      setTab("payments");
      setSelId(id);
    },
    closeDetail: () => setSelId(null),
    refundSelected: () => {
      const target = rawPayments.find((p) => p.id === selId);
      if (target?.processorId) {
        // Fire-and-forget: the UI updates optimistically, matching the prototype.
        fetch("/api/refunds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: target.processorId }),
        }).catch(() => {});
      }
      setRawPayments((prev) => prev.map((p) => (p.id === selId ? { ...p, status: "Refunded" } : p)));
      setSelId(null);
    },
    chargeOpen,
    chargeStage,
    cents,
    openCharge: () => {
      setChargeOpen(true);
      setChargeStage("amount");
      setCents(0);
    },
    closeCharge: () => setChargeOpen(false),
    tapKey: (k) =>
      setCents((c) =>
        k === "⌫" ? Math.floor(c / 10) : k === "00" ? Math.min(c * 100, MAX_CENTS) : Math.min(c * 10 + Number(k), MAX_CENTS),
      ),
    tapToPay,
    newSale: () => {
      setChargeStage("amount");
      setCents(0);
    },
    instantDone,
    sendInstant: () => setInstantDone(true),
    evidence,
    toggleEvidence: (i) => setEvidence((ev) => ev.map((v, j) => (j === i ? !v : v))),
    dispSubmitted,
    submitDispute: () => {
      if (evidence.every(Boolean)) setDispSubmitted(true);
    },
    stripeOn,
    adyenOn,
    shopify,
    woo,
    toggleRail: (k) => (k === "stripeOn" ? setStripeOn((v) => !v) : setAdyenOn((v) => !v)),
    toggleStore: (k) => (k === "shopify" ? setShopify((v) => !v) : setWoo((v) => !v)),
  };

  return <TallyContext.Provider value={value}>{children}</TallyContext.Provider>;
}
