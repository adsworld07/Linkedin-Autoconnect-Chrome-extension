import { extendTheme } from "@chakra-ui/react";

export const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
});
