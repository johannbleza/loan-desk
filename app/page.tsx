import ActionCard from "@/components/dashboard/ActionCard";
import MonthlyCollection from "@/components/payments/MonthlyCollection";
import { dashboardActions } from "@/lib/constants";

const page = () => {
  return (
    <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Loan Management System</h1>
        <p className="text-zinc-400">
          Manage your agents, clients, and loans efficiently
        </p>
      </div>
      <section>
        <MonthlyCollection />
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardActions.map(({ name, desc, actions }) => (
          <ActionCard key={name} name={name} desc={desc} actions={actions} />
        ))}
      </section>
    </main>
  );
};

export default page;
