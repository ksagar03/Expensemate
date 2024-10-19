import type { Metadata } from "next";
import "./globals.css";
import Footer from "./Components/Footer";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your spendings everyday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        </head>
      <body
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
