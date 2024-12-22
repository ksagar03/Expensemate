import type { Metadata } from "next";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Provider from "@/context/Provider";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your spendings everyday",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <body className=" bg-light w-full">
          <Header />
          <NotificationProvider>{children}</NotificationProvider>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
