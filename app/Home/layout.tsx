import type { Metadata } from "next";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Provider from "@/context/Provider";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link className="rounded-full" rel="icon" href="/favicon.ico" />
      </head>
      <Provider>
        <body>
          <Header />
          <main className="min-h-screen">{children}</main>

          <Footer />
        </body>
      </Provider>
    </html>
  );
}
