import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useRouter } from "next/router";

export default function OemHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  // Authentication handling
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

  // Scroll effect for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      as="nav"
      className="header"
      style={{
        backgroundColor: `rgba(10, 12, 14, 0.5)`,
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid #332018" : "none",
      }}
      px={{ base: 4, md: 8 }}
      py={4}
      alignItems="center"
    >
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Link href="/" shallow>
          <Box
            width={{ base: "120px", md: "180px" }}
            height={{ base: "24px", md: "36px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/bloctrace-logo-long-light.svg"
              alt="BlocTrace Logo"
              width={180}
              height={36}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Link>

        {/* Centered Desktop Menu */}
        <Flex
          gap="12"
          mx="auto"
          display={{ base: "none", md: "flex" }}
          fontSize="md"
        >
          {[
            "Dashboard",
            "Create Batch",
            "Manage Batch",
            "Add Shippers",
            "Account",
          ].map((item, index) => (
            <Link
              href={
                item === "Dashboard"
                  ? "/oems/"
                  : `/oems/${item.toLowerCase().replace(" ", "_")}`
              }
              key={index}
              shallow
            >
              <Text
                color="brand.0"
                _hover={{
                  color: "brand.600",
                  borderBottom: "2px solid",
                  borderColor: "brand.600",
                  cursor: "pointer",
                }}
              >
                {item.toUpperCase()}
              </Text>
            </Link>
          ))}
        </Flex>

        {/* Connect Button */}
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

        {/* Mobile Hamburger Menu */}
        <IconButton
          icon={<HamburgerIcon boxSize={6} />}
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          aria-label="Open Menu"
          variant="ghost"
          color="brand.0"
          padding="0px 12px 0px 12px"
          _active={{ bg: "transparent" }}
        />
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(10, 12, 14, 0.9)" backdropFilter="blur(10px)">
          <DrawerCloseButton color="brand.0" mt="6" />
          <DrawerBody
            display="flex"
            flexDirection="column"
            alignItems="start"
            pt="12"
            pl="4"
          >
            {[
              "Dashboard",
              "Create Batch",
              "Manage Batch",
              "Add Shippers",
              "Account",
            ].map((item, index) => (
              <Link
                href={`/oems/${item.toLowerCase().replace(" ", "_")}`}
                key={index}
                shallow
              >
                <Text
                  color="brand.0"
                  _hover={{
                    color: "brand.600",
                    borderBottom: "2px solid",
                    borderColor: "brand.300",
                  }}
                  fontSize="md"
                  py="2"
                  onClick={onClose}
                >
                  {item.toUpperCase()}
                </Text>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
