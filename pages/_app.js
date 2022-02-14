import { ChakraProvider, Box } from '@chakra-ui/react'
import { AudioPlayerProvider } from "react-use-audio-player"
import { customTheme } from "../styles/theme.js";
import Fonts from "../styles/Fonts";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} >
      <Fonts />
      <AudioPlayerProvider>
        <Box minHeight='100vh' bg='#ff93a6' >
          <Component {...pageProps} />
        </Box>
      </AudioPlayerProvider>
    </ChakraProvider>
  )
}

export default MyApp
