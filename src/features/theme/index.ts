import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: {
    html: {
      scrollBehavior: 'smooth',
      webkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
      minHeight: '100dvh',
    },
  },
};

const theme = extendTheme({
  config,
  styles,
});

export default theme;
