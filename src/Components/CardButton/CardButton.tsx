import { motion } from "framer-motion";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./CardButton.module.css";

interface CardButtonProps {
  children: React.ReactNode;
  href: string;
}

const CardButton = ({ children, href }: CardButtonProps) => {
  const [mousePos, setMousePos] = useState<{ x: string; y: string } | null>(
    null
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    setMousePos({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseLeave = () => {
    // Set to null to remove the glow effect when the mouse leaves the card
    setMousePos(null);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} passHref>
        <Box
          className={styles.cardButton}
          bg="rgba(255, 255, 255, 0.1)" // Light, translucent white
          borderRadius="12px"
          padding="3.6rem"
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
            background: mousePos
              ? `radial-gradient(circle at ${mousePos.x} ${mousePos.y}, rgba(255, 255, 255, 0.15), transparent 30%)`
              : "transparent", // More subtle white glow with lower opacity

            pointerEvents: "none",
            transition: "background 0.2s ease", // Smooth transition for glow effect
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            background: "linear-gradient(135deg, #ffffff33, #00000033)",
            backdropFilter: "blur(10px)", // Glass blur effect
            zIndex: -1,
          }}
        >
          {children}
        </Box>
      </Link>
    </motion.div>
  );
};

export default CardButton;
