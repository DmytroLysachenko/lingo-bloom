"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

interface ClientSessionProviderProps extends PropsWithChildren {
  session: Session | null;
}

const ClientSessionProvider = ({
  children,
  session,
}: ClientSessionProviderProps) => {
  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
};

export default ClientSessionProvider;
