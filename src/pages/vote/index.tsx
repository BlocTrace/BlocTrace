//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import {
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import type { NextPage } from "next";

const Vote: NextPage = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>BlocTrace</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Flex justifyContent="center">
          <Heading
            as="h2"
            fontSize="5rem"
            color="brand.0"
            fontWeight="medium"
            size="lg"
            p="2rem"
            mb="1rem"
            textAlign="center"
          >
            Vote for your Proposal
          </Heading>
        </Flex>
      </Layout>
    </>
  );
};

export default Vote;

// <div>
//   <main className={styles.main}>
//     <InstructionsComponent></InstructionsComponent>
//   </main>
// </div>
