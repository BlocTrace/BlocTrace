import { getSession, signOut } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";

import styles from "./account.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";
import { useDisconnect } from "wagmi";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Heading,
  Badge,
  Text,
  Image,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import { Formik, Field, ErrorMessage } from "formik";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import FlipCard, { BackCard, FrontCard } from "Components/FlipCard/FlipCard";
import CardPlaceholder from "Components/CardPlaceholder/CardPlaceholder";
import oemContractJson from "../../../assets/BlocTraceOEM.json";
const abi = oemContractJson.abi;

const oemAddress = process.env.NEXT_PUBLIC_OEM_CONTRACT;
const contractConfig = {
  address: oemAddress,
  abi,
};

// Validation function
const validate = (values) => {
  const errors = {};

  // Perform validation logic and set errors object

  return errors;
};

// gets a prop from getServerSideProps
function account({ user }) {
  const { disconnect } = useDisconnect();

  const handleSignOut = () => {
    disconnect();
    signOut({ redirect: "/oems/sign_in" });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [isOwned, setIsOwned] = useState(false);
  const { address, isConnected } = useAccount();
  console.log("address", address);
  console.log("isConnected", isConnected);
  const URI =
    "https://gateway.pinata.cloud/ipfs/QmX9UWRESfTfqzDCWHK1pzLq3tGbZMcW2qxpXSKYE8aqtb";
  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "safeMint",
    args: [address, URI],
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: userBalance } = useContractRead({
    ...contractConfig,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  React.useEffect(() => {
    if (userBalance > 0) {
      setIsOwned(true);
    } else {
      setIsOwned(false);
    }
  }, [userBalance]);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const toast = useToast();

  const isMinted = txSuccess;

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

  console.log(isOwned);
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS - Account Management</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading1"
          fontSize="5rem"
          color="brand.0"
          margin="16px"
          fontWeight="medium"
          textAlign="center"
        >
          Manage Account
        </Heading>
        <DarkBackground>
          <Flex flexDirection="row">
            {/* Column with image */}
            <Box margin="20px 70px 20px 70px">
              <FlipCard>
                <FrontCard isCardFlipped={isMinted}>
                  {isOwned ? (
                    <>
                      <Image
                        borderRadius="15px"
                        w="370px"
                        src="/nft_shield.svg"
                        alt="Image"
                      />
                      <Badge
                        fontSize="25px"
                        margin="40px 0px 0px 0px"
                        variant="solid"
                        colorScheme="green"
                      >
                        Account Verified
                      </Badge>
                    </>
                  ) : (
                    <>
                      <CardPlaceholder></CardPlaceholder>
                      <Badge
                        fontSize="25px"
                        margin="40px 0px 0px 0px"
                        variant="solid"
                        colorScheme="red"
                      >
                        UnVerified
                      </Badge>
                    </>
                  )}
                </FrontCard>
                <BackCard isCardFlipped={isMinted}>
                  <>
                    <Image
                      borderRadius="15px"
                      w="370px"
                      src="/nft_shield.svg"
                      alt="Image"
                    />
                    <Badge
                      fontSize="25px"
                      margin="40px 0px 0px 0px"
                      variant="solid"
                      colorScheme="green"
                    >
                      Account Verified
                    </Badge>
                  </>
                </BackCard>
              </FlipCard>
            </Box>

            {/* User data */}

            <Flex flexDirection="column" alignItems="left" margin="30px">
              <FormControl>
                <FormLabel className={styles.label} marginTop="5px">
                  Profile ID
                </FormLabel>
                <Input
                  isRequired
                  h="35px"
                  marginBottom="15px"
                  onChange={handleInputChange}
                  isDisabled={true}
                  className={styles.input}
                  color="brand.20"
                  name="profile_id"
                  defaultValue={user.profileId}
                />

                <FormLabel className={styles.label}>Wallet Address</FormLabel>
                <Input
                  isRequired
                  h="35px"
                  marginBottom="15px"
                  onChange={handleInputChange}
                  isDisabled={true}
                  className={styles.input}
                  color="brand.20"
                  name="profile_id"
                  defaultValue={user.address}
                />

                <FormLabel className={styles.label}>Business Name</FormLabel>
                <Input
                  isRequired
                  h="35px"
                  marginBottom="15px"
                  onChange={handleInputChange}
                  className={styles.input}
                  color="brand.20"
                  name="business_name"
                />

                <FormLabel className={styles.label}>Business Number</FormLabel>
                <Input
                  isRequired
                  h="35px"
                  marginBottom="15px"
                  onChange={handleInputChange}
                  className={styles.input}
                  color="brand.20"
                  name="business_number"
                />

                <FormLabel className={styles.label}>
                  Business Category
                </FormLabel>
                <Select
                  isRequired
                  h="35px"
                  marginBottom="15px"
                  onChange={handleInputChange}
                  className={styles.input}
                  color="brand.20"
                  name="business_catgory"
                >
                  <option>Original Equpment Manufacturer</option>
                  <option>Courier / Shipper</option>
                  <option>Product Maker</option>
                  <option>Retailer</option>
                </Select>

                <FormLabel className={styles.label}>Email Address</FormLabel>
                <Input
                  isRequired
                  h="35px"
                  marginBottom="30px"
                  onChange={handleInputChange}
                  className={styles.input}
                  color="brand.20"
                  name="email_address"
                  type="email"
                />
              </FormControl>


              {/* Form control */ }
              <HStack w="full" marginBottom="20px" justify="space-between">
                {mintError &&
                  toast({
                    title: "Error",
                    description: mintError.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })}
                {txError &&
                  toast({
                    title: "Error",
                    description: txError.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })}
                {isOwned ? (
                  <Button variant="disabled-button" disabled={true}>
                    Account Verified
                  </Button>
                ) : (
                  <Button
                    disabled={
                      isMinted || !mint || isMintLoading || isMintStarted
                    }
                    className="button"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    onClick={() => mint?.()}
                  >
                    {isMintLoading && "Waiting for approval"}
                    {isMintStarted && "Verifying..."}
                    {!isMintLoading &&
                      !isMintStarted &&
                      "Apply for Verification"}
                  </Button>
                )}
                <Button type="submit"> Update Account</Button>
              </HStack>

              <Button variant="signout-button" onClick={handleSignOut}>
                Sign out
              </Button>
            </Flex>
          </Flex>
        </DarkBackground>
      </OemLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/oems/sign_in",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default account;

{
  /* <Image
borderRadius="15px"
w="370px"
src="/nft_shield.svg"
alt="Image"
/>
{isOwned ? (

<Badge
  fontSize="25px"
  margin="40px 0px 0px 0px"
  variant="solid"
  colorScheme="green"
>
  Account Verified
</Badge>
) : (
<Badge
  fontSize="25px"
  margin="40px 0px 0px 0px"
  variant="solid"
  colorScheme="red"
>
  UnVerified
</Badge>
)} */
}
