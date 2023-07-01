import { getSession, signOut } from "next-auth/react";
import React from "react";
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
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import { useState } from "react";
import axios from "axios";
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
                  placeholder="Business Category"
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
              <HStack w="full" marginBottom="20px" justify="space-between">
                <Button type="submit">Verify Ownership</Button>
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
