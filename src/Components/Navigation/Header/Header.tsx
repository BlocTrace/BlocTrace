import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useToken,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useRouter } from "next/router";

export default function Header() {
  const backgroundColor = useToken("colors", "brand.60");
  const [scrolled, setScrolled] = React.useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const account = useAccount({
    onDisconnect() {
      console.log("Disconnected");
      push("/"); // Redirect the user after signing out
    },
  });

  useEffect(() => {
    const handleAuth = async () => {
      const { message } = (await requestChallengeAsync({
        address: address as string,
        chainId: chain!.id,
      })) as { id: string; profileId: string; message: string };

      const signature = await signMessageAsync({ message });

      const { url } = (await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/oems",
      })) as { url: string };
      push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    }
  }, [status, isConnected]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
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
        backgroundColor: `rgba(10, 12, 14, 0.5)`,
        backdropFilter: "blur(10px)", // Apply background blur
        borderBottom: scrolled ? "1px solid #332018" : "none",
      }}
      px={{ base: 4, md: 8 }}
      py={4}
      alignItems="center"
    >
      <Link href="/" shallow>
        <Box className={styles.yamato_logo}>
          <Image
            src="bloctrace-logo-long-light.svg"
            alt="BlocTrace Logo"
            width={3500} // Increased for larger screens
            height={700} 
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Link>
      <Spacer />

      {/* Desktop Menu */}
      <ButtonGroup
        className={styles.nav_menu}
        variant="ghost"
        gap="2"
        display={{ base: "none", md: "flex" }} // Show only on larger screens
      >
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
        <Link href="/couriers" shallow>
          <Button
            color="brand.0"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            COURIERS
          </Button>
        </Link>
        <Link href="/product_makers" shallow>
          <Button
            color="brand.0"
            _hover={{
              borderColor: "brand.300",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            PRODUCT MAKERS
          </Button>
        </Link>
        <Link href="/retailers" shallow>
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

      {/* Mobile Hamburger Menu */}
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }} // Show only on smaller screens
        onClick={onOpen}
        aria-label="Open Menu"
        variant="ghost"
        color="brand.0"
      />

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap="4">
              <Link href="/oems" shallow>
                <Button onClick={onClose} w="100%">OEMS</Button>
              </Link>
              <Link href="/couriers" shallow>
                <Button onClick={onClose} w="100%">COURIERS</Button>
              </Link>
              <Link href="/product_makers" shallow>
                <Button onClick={onClose} w="100%">PRODUCT MAKERS</Button>
              </Link>
              <Link href="/retailers" shallow>
                <Button onClick={onClose} w="100%">RETAILERS</Button>
              </Link>
              <Link
                href="https://github.com/Sahil24-lab/BlocTrace"
                target="_blank"
                rel="noopener noreferrer"
                shallow
              >
                <Button onClick={onClose} w="100%">DOCS</Button>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Spacer />

      <Flex fontSize="18px">
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
