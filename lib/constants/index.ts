import {
  ChartColumn,
  FileText,
  HandCoins,
  UserCheck,
  Users,
} from "lucide-react";

export const dashboardActions = [
  {
    name: "Agent Management",
    desc: "Add and manage your agents",
    actions: [
      {
        action: "View All Agents",
        link: "/agents",
      },
      {
        action: "Add New Agent",
        link: "/agents/new",
      },
    ],
  },
  {
    name: "Client Management",
    desc: "Add and manage your client",
    actions: [
      {
        action: "View All clients",
        link: "/clients",
      },
      {
        action: "Add New client",
        link: "/clients/new",
      },
    ],
  },
  {
    name: "Loan Management",
    desc: "Create and manage loans",
    actions: [
      {
        action: "View All Loans",
        link: "/loans",
      },
      {
        action: "Create New Loan",
        link: "/loans/new",
      },
    ],
  },
  {
    name: "Balance Sheet",
    desc: "View balance sheet and transaction history",
    actions: [
      {
        action: "View Transactions",
        link: "/balance-sheet",
      },
    ],
  },
];

export const navLinks = [
  {
    icon: ChartColumn,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: UserCheck,
    name: "Agents",
    href: "/agents",
  },
  {
    icon: Users,
    name: "Clients",
    href: "/clients",
  },
  {
    icon: HandCoins,
    name: "Loans",
    href: "/loans",
  },
  {
    icon: FileText,
    name: "Balance Sheet",
    href: "/balanc-sheet",
  },
];

export interface actions {
  action: string;
  link: string;
}

export const paymentStatus = ["Due", "Paid", "Interest Paid"];
