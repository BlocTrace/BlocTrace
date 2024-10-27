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

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;

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
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <>
      <Layout>
        <Head>
          <title>BlocTrace</title>
        </Head>

        {/* Hero Section */}
        <Flex
          padding={{ base: "2rem 1rem", md: "6rem 0rem" }}
          gap={{ base: "8", md: "20" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center" // Centers the content on desktop
        >
          <Box
            flex="1"
            padding={{ base: "0rem 1rem", md: "0rem 4rem" }} // Adjusted padding for better centering
            maxWidth="600px" // Limit width for better centering on larger screens
          >
            <Heading
              color="white"
              textAlign={{ base: "center", md: "left" }} // Centered on mobile, left on desktop
              fontSize={{ base: "4xl", md: "7xl" }} // Larger font size on desktop
            >
              BlocTrace
            </Heading>
            <Heading
              fontWeight={200}
              fontSize={{ base: "lg", md: "3xl" }} // Smaller on mobile, larger on desktop
              letterSpacing="0.02em"
              padding={{ base: "1rem 0", md: "1rem 0" }}
              color="brand.20"
              textAlign={{ base: "center", md: "left" }} // Centered on mobile, left on desktop
            >
              Traceability you can trust,
              <br />
              From source to shelf
            </Heading>
            <Spacer />
            <Button
              onClick={handleSignUpClick}
              marginTop="1.5rem"
              size={{ base: "lg", md: "xl" }}
              colorScheme="orange"
              mx={{ base: "auto", md: "0" }} // Center on mobile, align left on desktop
            >
              Get Started
            </Button>
          </Box>

          <Box flex="1" maxWidth="500px" display="flex" justifyContent="center">
            <Image
              src="hero-iimage.svg"
              alt="hero image"
              borderRadius="md"
              width={{ base: "100%", md: "auto" }}
            />
          </Box>
        </Flex>

        {/* Why BlocTrace */}
        <Flex
          direction="column"
          padding={{ base: "2rem 1rem", md: "4rem 5rem" }}
        >
          <Heading
            padding={{ base: "1rem 0", md: "0rem 0rem 0rem 0rem" }}
            color="brand.20"
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign={{ base: "center", md: "center" }}
          >
            Why BlocTrace?
          </Heading>
          <Text
            padding={{ base: "1rem 0", md: "2.2rem 0rem 10rem 5rem" }}
            color="brand.20"
            fontSize={{ base: "md", md: "lg" }}
            textAlign={{ base: "center", md: "center" }}
          >
            As global supply chains grow more complex and fragmented, the risk
            of fraud rises. BlocTrace is a trustworthy method to track your
            product's journey at every step.
          </Text>
        </Flex>

        {/* Customers */}
        <Heading
          padding={{ base: "1rem", md: "0rem 0rem 6rem 5rem" }}
          color="brand.20"
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign={{ base: "center", md: "center" }}
        >
          Our Supply Chain System is Built For
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing="1.5rem"
          paddingX={{ base: "1rem", md: "5rem" }}
        >
          <CardButton href="/oems">
            <Flex align="center" minHeight="130px">
              <Image
                src="factory-icon.svg"
                alt="OEM logo"
                boxSize={{ base: "60px", md: "100px" }}
                marginRight="1.5rem"
              />
              <Flex
                flexDirection="column"
                gap={2}
                padding={{ base: "0", md: "0rem 3rem" }}
              >
                <Heading
                  color="brand.20"
                  size="md"
                  fontSize={{ base: "lg", md: "md" }}
                  marginBottom="1.2rem"
                >
                  OEM's
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="brand.20">
                  Enhance brand image by eliminating counterfeit products.
                </Text>
              </Flex>
            </Flex>
          </CardButton>
          <CardButton href="/oems">
            <Flex align="center" minHeight="130px">
              <Image
                src="shipping-icon.svg"
                alt="Shipping logo"
                boxSize={{ base: "60px", md: "100px" }}
                marginRight="1.5rem"
              />
              <Flex
                flexDirection="column"
                gap={2}
                padding={{ base: "0", md: "0rem 3rem" }}
              >
                <Heading
                  color="brand.20"
                  size="md"
                  fontSize={{ base: "lg", md: "md" }}
                  marginBottom="1.2rem"

                >
                  Shippers/Couriers
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="brand.20">
                  Reduce wastage and lost parcels using our unified supply chain
                  tracking system.
                </Text>
              </Flex>
            </Flex>
          </CardButton>
          <CardButton href="/oems">
            <Flex align="center" minHeight="100px">
              <Image
                src="/circuitboard-icon.svg"
                alt="Product Makers logo"
                boxSize={{ base: "60px", md: "100px" }}
                marginRight="1.5rem"
              />
              <Flex
                flexDirection="column"
                gap={2}
                padding={{ base: "0", md: "0rem 3rem" }}
              >
                <Heading
                  color="brand.20"
                  size="md"
                  fontSize={{ base: "lg", md: "md" }}
                  marginBottom="1.2rem"

                >
                  Product Makers
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="brand.20">
                  Maximise the quality of your products by tracing componnents directly from the OEM.
                </Text>
              </Flex>
            </Flex>
          </CardButton>
          <CardButton href="/oems">
            <Flex align="center" minHeight="130px">
              <Image
                src="retailer-icon.svg"
                alt="Retailers/Distributors logo"
                boxSize={{ base: "60px", md: "100px" }}
                marginRight="1.5rem"
              />
              <Flex
                flexDirection="column"
                gap={2}
                padding={{ base: "0", md: "0rem 3rem" }}
              >
                <Heading
                  color="brand.20"
                  size="md"
                  fontSize={{ base: "lg", md: "md" }}
                  marginBottom="1.2rem"

                >
                  Retailers/Distributors
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="brand.20">
                  Provide your customers with confidence in the quality and
                  legitimacy of your products.
                </Text>
              </Flex>
            </Flex>
          </CardButton>
        </SimpleGrid>

        {/* How it Works */}
        <Flex
          padding={{ base: "4rem 1rem", md: "10rem 0rem 0rem 0rem" }}
          flexDirection="column"
          alignItems="center"
        >
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            padding={{ base: "1rem", md: "5rem 0rem 5rem 5rem" }}
            color="brand.20"
            textAlign="center"
          >
            How it Works
          </Heading>
          <Image
            src="userflow.svg"
            width={{ base: "100%", md: "80%" }}
            borderRadius="lg"
          />
        </Flex>

        {/* Stats Section */}
        <Flex
          className={styles.flexContainer}
          padding={{ base: "4rem 1rem", md: "8rem" }}
        >
          <DarkBackground>
            <Box>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <Box mr={{ base: 0, md: 8 }} mb={{ base: 4, md: 0 }}>
                  <Image
                    className={styles.image}
                    src="bloctrace-logo.svg"
                    alt="BlocTrace Logo"
                    width={{ base: 150, md: 300 }}
                    height={{ base: 150, md: 300 }}
                  />
                </Box>
                <Flex flexDirection="column" alignItems="center" width="100%">
                  <Heading
                    fontWeight="bold"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="brand.20"
                    textAlign="center"
                  >
                    BlocTrace Network Stats
                  </Heading>

                  <Box flex="1" mt={{ base: 4, md: 14 }} width="100%">
                    <Flex
                      justifyContent="space-around"
                      flexDirection={{ base: "column", md: "row" }}
                      alignItems="center"
                      gap={8}
                    >
                      <Box textAlign="center">
                        <Text
                          className="body"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Growers Onboarded
                        </Text>
                        <Text
                          className="heading2"
                          fontSize={{ base: "xl", md: "2xl" }}
                        >
                          10
                        </Text>
                      </Box>

                      <Box textAlign="center">
                        <Text
                          className="body"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Products Verified
                        </Text>
                        <Text
                          className="heading2"
                          fontSize={{ base: "xl", md: "2xl" }}
                        >
                          5.5M
                        </Text>
                      </Box>

                      <Box textAlign="center">
                        <Text
                          className="body"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Supply Chain Value Verified
                        </Text>
                        <Text
                          className="heading2"
                          fontSize={{ base: "xl", md: "2xl" }}
                        >
                          $1.1M
                        </Text>
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
