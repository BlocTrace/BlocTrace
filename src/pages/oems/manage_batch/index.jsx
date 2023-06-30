import React from "react";
//import styles from "../styles/Home.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";
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
import DarkBackground from "Components/DarkBackground/DarkBackground";
export default function manage_batch() {
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS - Manage Batch</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          MANAGE BATCH
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
}
