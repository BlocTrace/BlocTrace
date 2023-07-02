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
import useAppState from "../../hooks/useAppState";

const Dashboard: NextPage = () => {
  const { user, userProfile } = useAppState();

  


  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - OEMs</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading1"
          margin="3rem"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          OEM Dashboard
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="30px"
        >
          {/* User balances */}
          <DarkBackground>
            <Flex flexDirection="row">
              {/* Left column */}
              <Box flex="1">
                <Heading className="heading1">Business Info</Heading>
                <Flex flexDirection="row">
                  {/* left inner*/}
                  <Flex
                    flexDirection="column"
                    flex="1"
                    justifyContent="flex-end"
                    marginRight="1rem"
                  >
                    <Heading
                      className="label"
                      fontSize="32px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Business Name:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="32px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Profile ID:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="32px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      No. Verfied Couriers:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="32px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Batches Produced:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="32px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Verification Status:{" "}
                    </Heading>
                  </Flex>
                  {/* right inner*/}
                  <Flex
                    flexDirection="column"
                    flex="1"
                    justifyContent="flex-start"
                    marginRight="1rem"
                  >
                    <Heading
                      className="heading2"
                      fontSize="32px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {userProfile?.business_name}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="32px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {user?.address.slice(0, 6) +
                        "..." +
                        user?.address.slice(-6)}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="32px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                     5
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="32px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      4
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="32px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      Verification Status:{" "}
                    </Heading>
                  </Flex>
                </Flex>
              </Box>

              {/* Right column */}
              <Box flex="1">
                <Heading className="heading1">Right Column</Heading>
                {/* Add your content for the right column here */}
              </Box>
            </Flex>
          </DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
};

export default Dashboard;
