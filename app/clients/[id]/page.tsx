"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideMail, Phone, User, UserCheck } from "lucide-react";
import { getClient } from "@/lib/actions/client";
import { Client } from "@/lib/types/client";
import Link from "next/link";
import EditClientDialog from "@/components/clients/EditClientDialog";
import DeleteClientDialog from "@/components/clients/DeleteClientDialog";
import AddLoanDialog from "@/components/loans/AddLoanDialog";
import LoanList from "@/components/loans/LoanList";
import { Loan } from "@/lib/types/loan";
import { getLoans } from "@/lib/actions/loan";

const ClientPage = () => {
  const params = useParams();
  const { id } = params;

  const [client, setClient] = useState<Client | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    try {
      setLoans((await getLoans(id as string)) ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClient = async () => {
    try {
      setClient(await getClient(id as string));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (client) {
    return (
      <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
          <div className="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/clients">Clients</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Client Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-bold">{client.name}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <AddLoanDialog
              onAdd={fetchLoans}
              agent_id={client.agent_id}
              client_id={client.id}
              client_name={client.name}
            />
            <EditClientDialog
              client={client}
              onEdit={fetchClient}
              isButton={true}
            />
            <DeleteClientDialog
              client={client}
              onDelete={fetchClient}
              isButton={true}
            />
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <User />
              <h1 className="text-2xl font-semibold">Client Information</h1>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex gap-4 items-center text-zinc-500">
                <LucideMail />
                <div>
                  <h2>Email</h2>
                  <h2 className="text-black">{client.email}</h2>
                </div>
              </div>
              <div className="flex gap-4 items-center text-zinc-500">
                <Phone />
                <div>
                  <h2>Phone</h2>
                  <h2 className="text-black">{client.phone}</h2>
                </div>
              </div>
              <div className="flex gap-4 items-center text-zinc-500">
                <UserCheck />
                <div>
                  <h2>Assigned Agent</h2>
                  <Link href={`/agents/${client.agent_id}`}>
                    <h2 className="text-black hover:underline">
                      {client.agent!.name}
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <LoanList loans={loans} onAction={fetchLoans} showAgent={true} />
      </main>
    );
  } else if (client!) {
    return (
      <main className="flex justify-center items-center mt-40">
        <h1 className="font-bold text-4xl">404 Agent Not Found</h1>
      </main>
    );
  }
};

export default ClientPage;
