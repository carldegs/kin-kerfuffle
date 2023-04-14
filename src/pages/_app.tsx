import { GameProvider } from '@/modules/game/context';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </ChakraProvider>
  );
}
