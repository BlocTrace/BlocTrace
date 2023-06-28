//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
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

  useEffect(() => {
    console.log("mintData:", mintData);
  }, [mintData]);

  useEffect(() => {
    console.log("txData:", txData);
  }, [txData]);

  let isMinted = txSuccess;
  if (txSuccess) {
    isMinted = false;

    console.log("isMinted", isMinted);
    console.log("isMintStarted", isMintStarted);
    console.log("isMinted", isMinted);
  }
  return (
    <>
      <Layout>
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
          <DarkBackground>
            <Flex align="center" justify="center" height="100%">
              <Box textAlign="center" width="100%" height="100%">
                <Text
                  className="heading1"
                  marginTop="40px"
                  marginBottom="40px"
                  justifyItems="center"
                >
                  User Balance
                </Text>
                <Grid templateColumns="repeat(1, 40%) 50%" gap="10px">
                  <GridItem>
                    <Text
                      className="heading2"
                      textAlign="right"
                      color="brand.40"
                    >
                      {parseFloat(
                        ethers.utils.formatEther(totalMinted)
                      ).toFixed(2)}
                    </Text>
                  </GridItem>
                  <GridItem marginX="20px">
                    <Text className="heading2" textAlign="left">
                      YMT
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      className="heading2"
                      textAlign="right"
                      color="brand.40"
                    >
                      10
                    </Text>
                  </GridItem>
                  <GridItem marginX="20px">
                    <Text className="heading2" textAlign="left">
                      Undelegated
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      className="heading2"
                      textAlign="right"
                      color="brand.40"
                    >
                      70
                    </Text>
                  </GridItem>
                  <GridItem marginX="20px">
                    <Text className="heading2" textAlign="left">
                      Delegated
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            </Flex>
          </DarkBackground>
          {/* Mint Tokens */}
          <DarkBackground>
            <NumberInput>
              <NumberInputField
                height="50px"
                width="500px"
                marginTop="90px"
                marginBottom="25px"
                borderRadius="25px"
                placeholder="Enter Number of Tokens to Mint"
              />
            </NumberInput>
            {mintError && (
              <p style={{ marginTop: 24, color: "#FF6257" }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: "#FF6257" }}>
                Error: {txError.message}
              </p>
            )}
            {mounted && isConnected && (
              <Button
                disabled={!mint || isMintLoading || isMintStarted}
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint?.()}
              >
                {isMintLoading && "Waiting for approval"}
                {isMintStarted && isMinted && "Minting..."}
                {!isMintLoading && !isMinted && "Mint Tokens"}
              </Button>
            )}

            <NumberInput>
              <NumberInputField
                height="50px"
                width="500px"
                marginTop="80px"
                marginBottom="25px"
                borderRadius="25px"
                placeholder="Enter Number of Tokens to Delegate"
              />
            </NumberInput>
            <Button
              marginBottom="80px"
              onClick={() => {
                mint?.();
              }}
            >
              Delegate Tokens
            </Button>
          </DarkBackground>
        </Flex>
      </Layout>
    </>
  );
};

export default Mint;
