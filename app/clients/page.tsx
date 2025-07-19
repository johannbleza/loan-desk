"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { getClients } from "@/lib/actions/client";
import AddClientDialog from "@/components/clients/AddClientDialog";
import ClientList from "@/components/clients/ClientList";
import { Client } from "@/lib/types/client";

const Page = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    setClients((await getClients()) ?? []);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Clients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl font-bold">Clients</h1>
        </div>
        <AddClientDialog onAdd={fetchClients} />
      </div>
      <ClientList showAll={true} clients={clients} onAction={fetchClients} />
    </main>
  );
};

export default Page;
