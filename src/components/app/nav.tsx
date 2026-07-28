import {
  LayoutGrid,
  ArrowLeftRight,
  Users,
  Store,
  ShoppingCart,
  BarChart3,
  FileBarChart,
  CreditCard,
  Banknote,
  Wallet,
  ShieldAlert,
  ShieldCheck,
  Boxes,
  Bell,
  Code2,
  UsersRound,
  Receipt,
  Settings,
  LifeBuoy,
  UserCircle,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: typeof LayoutGrid;
  key: string;
  to?: string;
  badge?: string;
};
export type NavGroup = { title?: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Overview", icon: LayoutGrid, key: "overview", to: "/app" },
      { label: "Transactions", icon: ArrowLeftRight, key: "transactions", to: "/transactions" },
      { label: "Customers", icon: Users, key: "customers", to: "/customers" },
      { label: "Merchants", icon: Store, key: "merchants", to: "/merchants" },
      { label: "Checkout", icon: ShoppingCart, key: "checkout", to: "/checkout" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", icon: BarChart3, key: "analytics", to: "/analytics" },
      { label: "Reports", icon: FileBarChart, key: "reports", to: "/reports" },
      { label: "Payments", icon: CreditCard, key: "payments", to: "/payments" },
      { label: "Payouts", icon: Banknote, key: "payouts", to: "/payouts" },
      { label: "Balances", icon: Wallet, key: "balances", to: "/balances" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Disputes", icon: ShieldAlert, key: "disputes", to: "/disputes", badge: "0" },
      { label: "Risk", icon: ShieldCheck, key: "risk", to: "/risk" },
      { label: "Integrations", icon: Boxes, key: "integrations", to: "/marketplace" },
      { label: "Notifications", icon: Bell, key: "notifications", to: "/notifications" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Developers", icon: Code2, key: "developers", to: "/developers" },
      { label: "Team", icon: UsersRound, key: "team", to: "/team" },
      { label: "Billing", icon: Receipt, key: "billing", to: "/billing" },
      { label: "Settings", icon: Settings, key: "settings", to: "/settings" },
      { label: "Support", icon: LifeBuoy, key: "support", to: "/support" },
      { label: "Profile", icon: UserCircle, key: "profile", to: "/profile" },
    ],
  },
];
