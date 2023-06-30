//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Flex, Heading, theme } from "@chakra-ui/react";

export default function Proposals() {
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
            Live Proposals
          </Heading>
        </Flex>
      </Layout>
    </>
  );
}
