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

import { app, database } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const dbInstance = collection(database, "users");

type AppStateContext = {
  user?: WagmiUserSession;
  userProfile?: BlocTraceUser;
  handleSignOut: () => Promise<void>;
};
const Context = createContext<AppStateContext>({} as AppStateContext);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // if (!ready) return <Loading />;
  const { disconnect } = useDisconnect();
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as WagmiUserSession;
  const [userProfile, setUserProfile] = useState<BlocTraceUser | undefined>(
    undefined
  );

  // TODO: This doesn't work, need to fix
  const handleSignOut = async () => {
    disconnect();
    console.log("calling handlesignout from context");
    await signOut();
    router.push("/oems/sign_in");
  };

  const fetchData = async (userProfileId: string) => {
    try {
      const q = query(
        collection(database, "users"),
        where("profile_id", "==", userProfileId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        const userData: BlocTraceUser =
          querySnapshot.docs[0].data() as BlocTraceUser;
        console.log("userData", userData);
        setUserProfile(userData);
      }
    } catch (error) {
      console.error("Error retrieving user data from the database:", error);
    }
  };

  useEffect(() => {
    if (user && user.profileId) {
      fetchData(user.profileId);
    }
  }, [user?.profileId!]);

  return (
    <Context.Provider
      value={{
        user: user as WagmiUserSession,
        userProfile: userProfile as BlocTraceUser,
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
