import { BlocTraceUser, WagmiUserSession } from "../types/User";
import {
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from "next-auth/react";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Router, useRouter } from "next/router";
import { useDisconnect } from "wagmi";

type AppStateContext = {
  user?: WagmiUserSession;
  handleSignOut: () => Promise<void>;
};
const Context = createContext<AppStateContext>({} as AppStateContext);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // if (!ready) return <Loading />;
  const { disconnect } = useDisconnect();

  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  // TODO: This doesn't work, need to fix
  const handleSignOut = async () => {
    disconnect();
    console.log("calling handlesignout from context");
    await signOut();
    router.push("/oems/sign_in");
  };

  return (
    <Context.Provider
      value={{
        user: user as WagmiUserSession,
        handleSignOut,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default function useAppState() {
  return useContext(Context);
}
