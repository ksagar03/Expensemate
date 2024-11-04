"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface providerType {
  children: React.ReactNode;
  session?: Session;
}

const Provider = ({ children, session }: providerType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
