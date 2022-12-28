import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  Hydrate,
  QueryClient,
  type DehydratedState,
  QueryClientProvider,
} from "@tanstack/react-query";

import "../styles/globals.css";
import React from "react";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{
  session: Session | null;
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
