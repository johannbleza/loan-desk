import {
  ChartColumn,
  FileText,
  Menu,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full shadow">
      <div className="p-4 flex justify-between max-w-[80rem] mx-auto">
        <Link
          href="/"
          className="flex justify-center items-center gap-2 cursor-pointer"
        >
          <Wallet />
          <h1 className="text-2xl font-bold">LoanDesk</h1>
        </Link>
        {/* Desktop View */}
        <div className="hidden md:flex justify-center items-center gap-4">
          <Link href="/" className="flex justify-center items-center gap-3">
            <ChartColumn className="size-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/agents"
            className="flex justify-center items-center gap-3"
          >
            <UserCheck className="size-4" />
            <span>Agents</span>
          </Link>
          <Link
            href="/clients"
            className="flex justify-center items-center gap-3"
          >
            <Users className="size-4" />
            <span>Clients</span>
          </Link>
          <Link
            href="/balance-sheet"
            className="flex justify-center items-center gap-3"
          >
            <FileText className="size-4" />
            <span>Balance Sheet</span>
          </Link>
        </div>
        {/* Mobile View */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-2xl">Navigation</SheetTitle>
              <div className="flex flex-col items-start gap-6 mt-6 text-xl">
                <Link
                  href="/"
                  className="flex justify-center items-center gap-3"
                >
                  <ChartColumn className="size-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/agents"
                  className="flex justify-center items-center gap-3"
                >
                  <UserCheck className="size-4" />
                  <span>Agents</span>
                </Link>
                <Link
                  href="/clients"
                  className="flex justify-center items-center gap-3"
                >
                  <Users className="size-4" />
                  <span>Clients</span>
                </Link>
                <Link
                  href="/balance-sheet"
                  className="flex justify-center items-center gap-3"
                >
                  <FileText className="size-4" />
                  <span>Balance Sheet</span>
                </Link>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
