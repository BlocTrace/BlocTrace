import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./DarkBackground.module.css";

interface DarkBackgroundProps {
  children: React.ReactNode;
}

export default function DarkBackground({ children }: DarkBackgroundProps) {
  return (
    <Box
      flex="1"
      className={styles.darkBackground}
      bg="rgba(0, 0, 0, 0.3)" // Dark translucent background
      borderRadius="12px" // Rounded corners
      padding="1.5rem" // Inner padding for spacing
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "inherit",
        padding: "1px", // Shiny glass-like effect
        background: "linear-gradient(135deg, #ffffff66, #ffffff00)", // Gradient for shine
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "inherit",
        background: "linear-gradient(135deg, #ffffff33, #00000033)", // Slight gradient for depth
        backdropFilter: "blur(10px)", // Glass blur effect
        zIndex: -1,
      }}
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // Soft shadow for depth
    >
      {children}
    </Box>
  );
}
