import { IconButton, ButtonGroup, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaMedium, FaTwitter, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Flex className={styles.footer}>
      <Flex className={styles.copyright}>
        <Text fontSize={["xs", "sm"]} color="brand.20">
          Copyright © {new Date().getFullYear()} SAHIL HARRIRAM TECH PTY LTD
        </Text>
      </Flex>

      <Flex className={styles["social-buttons"]}>
        <ButtonGroup variant="ghost" gap={4}>
          <IconButton
            as="a"
            href="https://twitter.com/sahil_harriram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://medium.com/@sahilharriram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            icon={<FaMedium fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/sahil-harriram/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin"
            icon={<FaLinkedin fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://github.com/Sahil24-lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            icon={<FaGithub fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
        </ButtonGroup>
      </Flex>

      <Flex className={styles.legal}>
        <Text fontSize={["xs", "sm"]} color="brand.20">
          <a href="/privacy_policy" target="_blank" rel="noopener noreferrer">
            Privacy policy
          </a>
        </Text>
        <Text fontSize={["xs", "sm"]} color="brand.20">
          <a
            href="terms_and_conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms &amp; conditions
          </a>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
