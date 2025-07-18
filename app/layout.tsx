import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/lib/layout/Navbar";

export const metadata: Metadata = {
  title: "LoanDesk - Loan Management System",
  description: "Loan Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
