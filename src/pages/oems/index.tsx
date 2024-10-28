// Import Statements
import { Box, Flex, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import OemLayout from "../../Components/OemLayout/OemLayout";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import useAppState from "../../hooks/useAppState";
import CardButtonSmall from "Components/CardButtonSmall/CardButtonSmall";
import styles from "./oems.module.css";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const {
    user,
    userProfile,
    isVerified,
    userConsignmentData,
    fetchConsignmentData,
  } = useAppState();

  useEffect(() => {
    if (user && user.profileId) {
      fetchConsignmentData(user.profileId);
    }
  }, []);

  // Card data array
  const cardDataRow1 = [
    {
      href: "/oems/account",
      imageSrc: "factory-icon.svg",
      altText: "factory icon",
      label: "Verify",
    },
    {
      href: "/oems/account",
      imageSrc: "verify_image.svg",
      altText: "verify",
      label: "Account Management",
    },
    {
      href: "/oems/add_shippers",
      imageSrc: "/shipping-icon.svg",
      altText: "shipping image",
      label: "Add Shippers",
    },
  ];

  const cardDataRow2 = [
    {
      href: "/oems/create_batch",
      imageSrc: "/circuitboard-icon.svg",
      altText: "circuitboard image",
      label: "Create Batch",
    },
    {
      href: "/oems/manage_batch",
      imageSrc: "retailer-icon.svg",
      altText: "retailer image",
      label: "Manage Batch",
    },
  ];

  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - OEMs</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Flex flexDirection="column" align="center" mx="auto">
          <Heading
            className="heading1"
            mt="5rem"
            mb="3rem"
            fontSize="4.5rem" // Adjusted size for main heading
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
            marginBottom="0.1rem" // Adjusted margin to reduce unnecessary padding
            w="100%"
          >
            <DarkBackground>
              <Flex flexDirection="row" padding="5.75rem">
                {/* Left column */}
                <Box flex="1">
                  <Heading className="heading1" fontSize="2.75rem" mb="1.5rem">
                    Business Info
                  </Heading>
                  <Flex flexDirection="row">
                    {/* Left Inner Column */}
                    <Flex
                      flexDirection="column"
                      flex="1"
                      justifyContent="flex-end"
                      marginRight="1rem"
                    >
                      {[
                        "Business Name",
                        "Wallet Address",
                        "No. Verified Couriers",
                        "Batches Produced",
                        "Verification Status",
                      ].map((label) => (
                        <Heading
                          key={label}
                          className="label"
                          fontSize="1.75rem" // Increased font size for labels
                          textAlign="right"
                          fontWeight="normal"
                        >
                          {label}:
                        </Heading>
                      ))}
                    </Flex>
                    {/* Right Inner Column */}
                    <Flex
                      flexDirection="column"
                      flex="1"
                      justifyContent="flex-start"
                      marginRight="1rem"
                    >
                      <Heading
                        className="heading2"
                        fontSize="1.75rem"
                        textAlign="left"
                        fontWeight="normal"
                      >
                        {userProfile?.business_name ?? "Account Not Setup"}
                      </Heading>
                      <Heading
                        className="heading2"
                        fontSize="1.75rem"
                        textAlign="left"
                        fontWeight="normal"
                      >
                        {user?.address
                          ? `${user.address.slice(0, 6)}...${user.address.slice(
                              -6
                            )}`
                          : "N/A"}
                      </Heading>
                      <Heading
                        className="heading2"
                        fontSize="1.75rem"
                        textAlign="left"
                        fontWeight="normal"
                      >
                        {userConsignmentData?.user_shippers_count ?? "N/A"}
                      </Heading>
                      <Heading
                        className="heading2"
                        fontSize="1.75rem"
                        textAlign="left"
                        fontWeight="normal"
                      >
                        {userConsignmentData?.total_consignments ?? "N/A"}
                      </Heading>
                      <Heading
                        className="heading2"
                        fontSize="1.75rem"
                        textAlign="left"
                        fontWeight="normal"
                      >
                        {isVerified ? "Verified" : "Unverified"}
                      </Heading>
                    </Flex>
                  </Flex>
                </Box>

                {/* Right Column with Card Buttons */}
                <Box flex="1.7">
                  <SimpleGrid
                    className={styles.simpleGrid}
                    columns={3}
                    spacing="1.5rem"
                  >
                    {cardDataRow1.map((card, index) => (
                      <CardButtonSmall key={index} href={card.href}>
                        <Image
                          className={styles.image}
                          src={card.imageSrc}
                          alt={card.altText}
                        />
                        <Heading
                          color="brand.20"
                          fontSize="1.5rem"
                          margin="1.5rem"
                          textAlign="center"
                        >
                          {card.label}
                        </Heading>
                      </CardButtonSmall>
                    ))}
                  </SimpleGrid>

                  <SimpleGrid
                    className={styles.simpleGrid}
                    columns={3}
                    spacing="1.5rem"
                    mt="2rem"
                  >
                    {cardDataRow2.map((card, index) => (
                      <CardButtonSmall key={index} href={card.href}>
                        <Image
                          className={styles.image}
                          src={card.imageSrc}
                          alt={card.altText}
                        />
                        <Heading
                          color="brand.20"
                          fontSize="1.5rem"
                          margin="1.5rem"
                          textAlign="center"
                        >
                          {card.label}
                        </Heading>
                      </CardButtonSmall>
                    ))}
                  </SimpleGrid>
                </Box>
              </Flex>
            </DarkBackground>
          </Flex>
        </Flex>
      </OemLayout>
    </>
  );
};

export default Dashboard;
