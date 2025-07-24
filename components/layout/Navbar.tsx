import { LogOutIcon, Menu, WalletMinimal } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { navLinks } from "@/lib/constants";
import { SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full shadow">
      <div className="p-4 flex justify-between max-w-[80rem] mx-auto">
        <Link
          href="/"
          className="flex justify-center items-center gap-2 cursor-pointer"
        >
          <WalletMinimal />
          <h1 className="text-2xl font-bold">LoanDesk</h1>
        </Link>
        {/* Desktop View */}
        <div className="hidden md:flex justify-center items-center gap-6">
          {navLinks.map(({ icon, name, href }) => {
            const Icon = icon;
            return (
              <Link
                key={name}
                href={href}
                className="flex justify-center items-center gap-3"
              >
                <Icon className="size-4" />
                <span>{name}</span>
              </Link>
            );
          })}
          <SignOutButton>
            <LogOutIcon className="cursor-pointer size-4" />
          </SignOutButton>
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
                {navLinks.map(({ icon, name, href }) => {
                  const Icon = icon;
                  return (
                    <Link key={name} href={href}>
                      <SheetClose className="flex justify-center items-center gap-3">
                        <Icon className="size-4" />
                        <span>{name}</span>
                      </SheetClose>
                    </Link>
                  );
                })}
                <SignOutButton />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
