import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import OemLayout from "../../../Components/OemLayout/OemLayout";
import Head from "next/head";

function SignIn() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { message } = await requestChallengeAsync({
        address: address,
        chainId: chain.id,
      });

      const signature = await signMessageAsync({ message });

      const { url } = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/oems",
      });
      push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
    if (status === "authenticated" && isConnected) {
      router.push("/oems");
    }
  }, [status, isConnected]);

  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - Sign In</title>
        </Head>
        <Flex
          justifyContent="center"
          alignItems="center"
          minHeight={`calc(100vh - 185px)`} // Adjust height based on header/footer
          overflow="hidden" // Prevent extra horizontal scrolling
        >
          <DarkBackground maxW="200px" maxH="300px" p="4">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              padding="4rem"
              borderRadius="md"
              boxShadow="lg"
            >
              <Heading
                as="h2"
                fontSize="2rem"
                color="brand.0"
                fontWeight="medium"
                mb="1.5rem"
                textAlign="center"
              >
                Sign in to view & manage your account
              </Heading>{" "}
              <Flex fontSize="20px" marginTop="3.5rem">
                <ConnectButton label="Sign In" />
              </Flex>
            </Flex>
          </DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
}

export default SignIn;
