import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    color: "brand.20", // change the input text color
    textAlign: "center",
    borderRadius: "25px",
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
