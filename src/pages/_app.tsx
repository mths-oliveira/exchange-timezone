import { Box, ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={{ lg: "5rem 12.5rem" }}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
