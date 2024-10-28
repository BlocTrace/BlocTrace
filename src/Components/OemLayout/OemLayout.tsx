import { Box, Flex, Container } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../Navigation/Footer/Footer";
import OemHeader from "../Navigation/OemHeader/OemHeader";
import React, { ReactNode } from "react";
import styles from "./OemLayout.module.css";

interface OemLayoutProps {
  children: ReactNode;
}

export default function OemLayout({ children }: OemLayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OEM Header</title>
      </Head>
      <div className={styles.flex_background}>
        <OemHeader />

        <Flex
          direction="column"
          align="center"
          margin="0 auto" // Center align the Flex horizontally
          width="100%"
          textAlign="center"
        >
          <Box
            flex="1"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth="100%"
            minHeight={`calc(100vh - 165px)`}
            padding="4" // Optional padding if needed for spacing
          >
            {children}
          </Box>
        </Flex>
        <Footer />
      </div>
    </>
  );
}
