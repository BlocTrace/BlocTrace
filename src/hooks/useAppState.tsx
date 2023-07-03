import { BlocTraceUser, WagmiUserSession } from "../types/User";
import { ConsignmentData, ConsignmentDetails } from "../types/ConsignmentData";
import { ShipperProfile } from "../types/Shipper";
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
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useAccount, useContractRead } from "wagmi";
import oemContractJson from "../assets/BlocTraceOEM.json";

const abi = oemContractJson.abi;
const oemAddress = "0xd96635bb9F92F89adc5F6B84432Bf2209771Eb67";
const contractConfig = {
  address: oemAddress,
  abi: abi,
};

const dbInstance = collection(database, "users");

type AppStateContext = {
  user?: WagmiUserSession;
  userProfile?: BlocTraceUser;
  isVerified?: boolean;
  userConsignmentData?: ConsignmentData;
  fetchConsignmentData: (userProfileId: string) => Promise<void>;
  querySnapshotConsignments?: ConsignmentDetails;
  querySnapshotShippers?: ShipperProfile;
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
  const [userConsignmentData, setUserConsignmentData] = useState<
    ConsignmentData | undefined
  >(undefined);
  const [querySnapshotConsignments, setQuerySnapshotConsignments] =
    useState<any>();
  const [querySnapshotShippers, setQuerySnapshotShippers] = useState<any>();

  const { address, isConnected } = useAccount() as {
    address: string;
    isConnected: boolean;
  };
  const [isVerified, setIsVerified] = useState(false);

  // TODO: This doesn't work, need to fix
  const handleSignOut = async () => {
    disconnect();
    console.log("calling handlesignout from context");
    await signOut();
    router.push("/oems/sign_in");
  };

  // Fetch data from DB
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

  const fetchConsignmentData = async (userProfileId: string) => {
    try {
      const queryConsignments = query(
        collection(database, "consignment"),
        where("profile_id_oem", "==", userProfileId)
      );
      const querySnapshotConsignments = await getDocs(queryConsignments);

      const totalConsignments = querySnapshotConsignments.size;
      let unassignedCount = 0;
      let assignedCount = 0;
      querySnapshotConsignments.forEach((doc) => {
        const data = doc.data();
        if (data.is_assigned) {
          assignedCount++;
        } else {
          unassignedCount++;
        }
      });
      const queryShippers = query(
        collection(database, "shippers"),
        where("profile_id_oem", "==", userProfileId)
      );
      const querySnapshotShippers = await getDocs(queryShippers);
      const totalShippers = querySnapshotShippers.size;

      setUserConsignmentData({
        consignments_assigned: assignedCount,
        consignments_unassigned: unassignedCount,
        total_consignments: totalConsignments,
        user_shippers_count: totalShippers,
      });

      setQuerySnapshotConsignments(querySnapshotConsignments); // Set querySnapshotConsignments
      setQuerySnapshotShippers(querySnapshotShippers);
      console.log("assignedCount", assignedCount);
      console.log("unassignedCount", unassignedCount);
      console.log("totalConsignments", totalConsignments);
      console.log("totalShippers", totalShippers);
      console.log("userConsignmentData", userConsignmentData);
    } catch (error) {
      console.error("Error retrieving user data from the database:", error);
    }
  };

  useEffect(() => {
    if (user && user.profileId) {
      fetchData(user.profileId);
      fetchConsignmentData(user.profileId);
    }
  }, [user?.profileId!]);

  // Fetch Data from Blockchain:
  const { data: userBalance } = useContractRead({
    address: oemAddress,
    abi: abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const balance: number = Number(userBalance);
  useEffect(() => {
    if (balance > 0) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [userBalance]);
  return (
    <Context.Provider
      value={{
        user: user as WagmiUserSession,
        userProfile: userProfile as BlocTraceUser,
        isVerified: isVerified as boolean,
        userConsignmentData: userConsignmentData as ConsignmentData,
        fetchConsignmentData,
        querySnapshotConsignments:
          querySnapshotConsignments as ConsignmentDetails,
        querySnapshotShippers: querySnapshotShippers as ShipperProfile,
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
