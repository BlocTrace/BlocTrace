//import styles from "../styles/Home.module.css";
import OemLayout from "../../Components/OemLayout/OemLayout";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { NextPage } from "next";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractJson from "../../assets/Yamato.json";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import { GetSessionParams, getSession, signOut } from "next-auth/react";

const abi = contractJson.abi;

const MINT_TOKENS_AMOUNT = ethers.utils.parseEther("10");
// get user address
const yamatoAddress = process.env.NEXT_YAMATO_CONTRACT_ADDRESS as string;
const contractConfig = {
  address: "0xAd4489CA4cEc71D70E19bCf9B77Cdad216788f5D", //process.env.NEXT_YAMATO_CONTRACT_ADDRESS as `0x${string}`,
  abi,
} as const;

const Mint: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0n);

  const { address, isConnected } = useAccount();
  // write contracft to get data
  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mint",
    args: [address, MINT_TOKENS_AMOUNT],
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: userBalanceData } = useContractRead({
    ...contractConfig,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  useEffect(() => {
    if (userBalanceData) {
      setTotalMinted(userBalanceData as bigint);
      console.log("userBalanceData:", userBalanceData);
    }
  }, [userBalanceData]);

  let isMinted = txSuccess;
  if (txSuccess) {
    isMinted = false;

    console.log("isMinted", isMinted);
    console.log("isMintStarted", isMintStarted);
    console.log("isMinted", isMinted);
  }
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - OEMs</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          OEM
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="30px"
        >
          {/* User balances */}
          <DarkBackground children={undefined}></DarkBackground>
          {/* Mint Tokens */}
          <DarkBackground children={undefined}></DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
};

export default Mint;
