import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useToken,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./OemHeader.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function OemHeader() {
  const backgroundColor = useToken("colors", "brand.60");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      console.log(`Scrolled: ${isScrolled}`);
      setScrolled(isScrolled);
    };

    // Only add the event listener if window is defined (i.e., we're on the client side)
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Clean up the event listener when the component is unmounted
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Flex
      as="nav"
      minWidth="max-content"
      className={styles.header}
      style={{
        backgroundColor: `rgba(10, 12, 14, 0.5)`, // Adjust the alpha value (0.8) as needed
        borderBottom: scrolled ? "1px solid #332018" : "none",
      }}
    >
      <Link href="/" shallow>
        <Box className={styles.yamato_logo}>
          <Image
            src="bloctrace-logo-long-light.svg"
            alt="BlocTrace Logo"
            width={2000}
            height={400}
          />
        </Box>
      </Link>
      <Spacer></Spacer>
      <ButtonGroup className={styles.nav_menu} variant="ghost" gap="2">
        <Link href="/oems" shallow>
          <Button
            color="brand.0"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "1px",
              transition: "ease-in-out 0.2s",
            }}
          >
            OEMS
          </Button>
        </Link>

        <Link href="/vote" shallow>
          <Button
            color="brand.0"
            aria-current="page"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            SHIPPERS
          </Button>
        </Link>

        <Link href="/proposals" shallow>
          <Button
            color="brand.0"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            RETAILERS
          </Button>
        </Link>

        <Link
          href="https://github.com/Sahil24-lab/BlocTrace"
          target="_blank"
          rel="noopener noreferrer"
          shallow
        >
          <Button
            color="brand.0"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            DOCS
          </Button>
        </Link>
      </ButtonGroup>
      <Spacer></Spacer>
      <Flex className={styles.connect}>
        <ConnectButton
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </Flex>
    </Flex>
  );
}
