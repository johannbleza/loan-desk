import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { actions } from "@/lib/constants";
import Link from "next/link";

interface ActionCardProps {
  name: string;
  desc: string;
  actions: actions[];
}

const ActionCard = ({ name, desc, actions }: ActionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map(({ action, link }, index) => (
          <Link key={action} href={link}>
            <Button
              className="w-full"
              variant={index != 0 ? "outline" : "default"}
            >
              {action}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActionCard;
