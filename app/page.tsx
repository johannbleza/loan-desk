import ActionCard from "@/components/dashboard/ActionCard";
import { dashboardActions } from "@/lib/constants";

const page = () => {
  return (
    <main className="min-h-dvh max-w-[80rem] mx-auto p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Loan Management System</h1>
        <p className="text-slate-400">
          Manage your agents, clients, and loans efficiently
        </p>
      </div>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {dashboardActions.map(({ name, desc, actions }) => (
          <ActionCard key={name} name={name} desc={desc} actions={actions} />
        ))}
      </section>
    </main>
  );
};

export default page;
