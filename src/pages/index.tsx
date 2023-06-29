import Layout from "../Components/Layout/Layout";
import Head from "next/head";
import {
  Flex,
  Image,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Spacer,
  Button,
} from "@chakra-ui/react";
import CardButton from "Components/CardButton/CardButton";
import styles from "../styles/Home.module.css";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import { tokenService } from "./api/tokenService";
import { useEffect, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function Home({ address }: AuthenticatedPageProps) {
  // const [totalSupply, setTotalSupply] = useState(null);
  // const [error, setError] = useState("");

  // const fetchTotalSupply = async () => {
  //   try {
  //     const data = await tokenService.getTotalSupply();
  //     setTotalSupply(data);
  //   } catch (error) {
  //     setError("Error fetching total supply.");
  //   }
  // };

  // useEffect(() => {
  //   fetchTotalSupply();
  // }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>BlocTrace</title>
        </Head>
        <Flex gap="20">
          <Box>
            <Heading className="header-hero" fontSize="10rem">
              BlocTrace
            </Heading>
            <Heading
              className="sub-header-hero"
              padding="0.2rem 0rem 0rem 0rem"
              color="brand.20"
            >
              Traceability You Can Trust, <br /> From Source to Shelf
            </Heading>
            <Spacer></Spacer>
            <Text
              className="body"
              fontSize="2rem"
              padding="5rem 0rem 3rem 0rem"
              textAlign="left"
            >
              Providing OEMs in the electronics industry with a comprehensive
              <br /> solution to track their products from raw materials to the
              end product
            </Text>
            <Button>Get Started with BlocTrace</Button>
          </Box>
          <Box>
            <Image
              src="hero-iimage.svg"
              alt="hero image"
              borderRadius="md"
              style={{ zIndex: 1 }}
            />
          </Box>
        </Flex>
        <Flex direction="column">
          <Heading
            className="heading"
            padding="2rem 0rem 0rem 0rem"
            color="brand.20"
          >
            Why BlocTrace?
          </Heading>

          <Text
            className="heading2"
            padding="5rem 0rem 10rem 5rem"
            color="brand.20"
          >
            As global supply chains grow more complex and fragmented, the risk
            of fraud rises. <br /> BlocTrace offers a simple solution to this
            problem by providing a trustworthy method to track your product's
            journey at every step.
          </Text>
        </Flex>

        {/* CUSTOMERS */}
        <Heading
          className="heading2"
          fontSize="5rem"
          padding="0rem 0rem 10rem 5rem"
          color="brand.20"
        >
          Our Supply Chain System is Built For
        </Heading>
        <SimpleGrid className={styles.simpleGrid} minChildWidth="140px">
          <CardButton href="/oems">
            <Image src="factory-icon.svg" alt="Mint Yamato Tokens" />
            <Heading color="brand.20" margin="1.5rem" size="md">
              OEM's
            </Heading>
            <Text fontSize="sm" color="brand.20">
              Enhance your brand reputation with on-chain component tracing,
              eliminating counterfeits.
            </Text>
          </CardButton>

          <CardButton href="/couriers">
            <Image src="shipping-icon.svg" alt="Vote" />
            <Heading color="brand.20" margin="1.5rem" size="md">
              Shippers/Couriers
            </Heading>
            <Text fontSize="sm" color="brand.20">
              Ensure your customers products get from A to B by verifying
              shipping consignments
            </Text>
          </CardButton>

          <CardButton href="/product_makers">
            <Image
              src="/circuitboard-icon.svg"
              alt="proposals image"
              borderRadius="lg"
            />
            <Heading color="brand.20" margin="1.5rem" size="md">
              Product Makers
            </Heading>
            <Text fontSize="sm" color="brand.20">
              Ensure the highest quality of your products by tracing your BOM
              directly from the OEM
            </Text>
          </CardButton>

          <CardButton href="/retailers">
            <Image src="retailer-icon.svg" alt="Docs Image" />
            <Heading color="brand.20" margin="1.5rem" size="md">
              Retailers/Distributors
            </Heading>
            <Text fontSize="sm" color="brand.20">
              Provide your customers with confidence of the quality and
              legitimacy of the products you sell
            </Text>
          </CardButton>
        </SimpleGrid>

        {/* How it Works */}
        <Flex padding="10rem 0rem 0rem 0rem">
          <Heading
            className="heading2"
            fontSize="5rem"
            padding="5rem 0rem 5rem 5rem"
            color="brand.20"
            textAlign="left"
          >
            How it Works
          </Heading>
          <Image src="userflow.svg" width="100%"></Image>
        </Flex>

        {/* STATS */}
        <Flex className={styles.flexContainer}>
          <DarkBackground>
            <Box>
              <Flex flexDirection={["column", "row"]} alignItems="start">
                <Box mr={8}>
                  <Image
                    className={styles.image}
                    src="logo-no-background.svg" //"bloctrace_snowflake.svg"
                    alt="Yamato Logo"
                    mr={3}
                    width={300}
                    height={300}
                  />
                </Box>
                <Flex flexDirection="column" alignItems="center" width="80%">
                  <Heading
                    className={styles.heading1}
                    fontWeight="bold"
                    mt={20}
                    color="brand.20"
                  >
                    BlocTrace Network Stats
                  </Heading>

                  <Box flex="1" mt={14} width="100%">
                    <Flex justifyContent="space-around">
                      <Box textAlign="center">
                        <Text className="body">OEMS Onboarded</Text>
                        <Text className="heading2">10</Text>
                      </Box>

                      <Box textAlign="center">
                        <Text className="body">Components Verified </Text>
                        <Text className="heading2">5.5M</Text>
                      </Box>

                      <Box textAlign="center">
                        <Text className="body">Components Value Verified</Text>
                        <Text className="heading2">$1.1M</Text>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </DarkBackground>
        </Flex>
      </Layout>
    </>
  );
}
