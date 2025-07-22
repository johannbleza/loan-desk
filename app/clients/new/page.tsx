"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addClient } from "@/lib/actions/client";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AgentSelect from "@/components/agents/AgentSelect";

const formSchema = z.object({
  agent_id: z.string().min(1, {
    message: "Agent is required.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
});

const AddClientPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      agent_id: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await addClient(values);
      if (data) {
        toast.success("Client added successfully!", { position: "top-center" });
        form.reset();
        router.push(`/clients/${data.id}`);
        return;
      }
      toast.error("Error adding client!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error adding client! ${error}`, { position: "top-center" });
    }
  };
  return (
    <div className="flex justify-center items-center mt-12 p-4">
      <Card>
        <CardContent>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Add New Client</h1>
            <p className="text-slate-400 text-sm">
              Please provide the necessary details to add a new client.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="agent_id"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Assigned Agent *</FormLabel>
                    <AgentSelect onValueChange={field.onChange} />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., john.doe@example.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., +63 917 123 4567"
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <Button type="submit" className="cursor-pointer">
                  Add Client
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClientPage;
