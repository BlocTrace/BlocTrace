import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

// RainbowKit Authentication
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

//import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";

import myTheme from "../theme/theme";

// FONT FOR WEB APP & CHAKRA UI
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";
import { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="http://localhost:3000/terms_and_conditions">
      Terms of Service
    </Link>{" "}
    and acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to BlocTrace",
});

const infuraApiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY;
if (!infuraApiKey || infuraApiKey.length <= 0) {
  console.log("infura if", infuraApiKey);
} else {
  console.log("infura else", infuraApiKey);
}

const walletConnectProjectId: string | undefined =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (walletConnectProjectId) {
  console.log("walletConnectId if", walletConnectProjectId);
} else {
  console.log("walletConnectId else", walletConnectProjectId);
}

//
const { chains, publicClient } = configureChains(
  [avalanche, avalancheFuji],
  [infuraProvider({ apiKey: infuraApiKey! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "BlocTrace",
  projectId: walletConnectProjectId!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
// export { WagmiConfig, RainbowKitProvider };

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();

  let defaultChain: string;
  if (process.env.NEXT_PUBLIC_DEFAULT_CHAIN) {
    defaultChain = process.env.NEXT_PUBLIC_DEFAULT_CHAIN;
  } else {
    throw new Error(
      "NEXT_PUBLIC_DEFAULT_CHAIN environment variable is not set"
    );
  }

  const initialChain: number | RainbowKitChain = parseInt(
    process.env.NEXT_PUBLIC_DEFAULT_CHAIN
  );
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      if (!isReconnected) router.reload();
    },
  });
  return (
    <ChakraProvider theme={myTheme}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              appInfo={{
                appName: "Yamato Finance",
                disclaimer: Disclaimer,
              }}
              theme={darkTheme({
                accentColor: "#D66E36",
                accentColorForeground: "white",
                borderRadius: "medium",
                fontStack: "system",
              })}
              modalSize="wide"
              initialChain={parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)}
              chains={chains}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
{
  /* <MainLayout>
<Component {...pageProps} />
</MainLayout> */
}
