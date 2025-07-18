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

export interface actions {
  action: string;
  link: string;
}
