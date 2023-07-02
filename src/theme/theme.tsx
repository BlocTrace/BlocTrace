import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./Components/buttonStyles";
import { spinnerStyles as Spinner } from "./Components/spinnerStyles";
const myTheme = extendTheme({
  colors: {
    brand: {
      0: "#fff", // White
      20: "#e8f1f2", // Light blue-gray
      40: "#20C8CE", // Bright blue
      50: "#e8f1f2", // light orange
      60: "#332018", // Dark Orange
      70: "#307993", // Dark teal
      80: "#446990", // Navy blue
      100: "#131617", // Very dark
      200: "#E34B2F", // Red
      250: "#C43338", // Augmented red
      300: "#54954E", // Green
      400: "#00cd74", // Bright green
      500: "#6441a5", // Purple
      600: "#D66E36", // Orange
      700: "#000", // Black
    },
  },
  fonts: {
    heading: `'Roboto', sans serif`,
    body: `'Roboto', sans serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  breakpoints: {
    base: "0em",
    sm: "29em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
  components: { Button, Spinner },
});

export default myTheme;
