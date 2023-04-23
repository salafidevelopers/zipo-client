import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  zipo: {
    50: '#9DA3FB',
    100: '#8990FB',
    200: '#757EFA',
    300: '#626CF9',
    400: '#4E59F9',
    500: '#313EF7',
    600: '#2634F7',
    700: '#1322F6',
    800: '#0918EC',
    900: '#0816D9',
    black: '#222222',
    deep: '#2A302E',
    light: '#313EF7',
  },
};
// font-family: 'Lato', sans-serif;
// font-family: 'Raleway', sans-serif;
const brandRing = {
  _focus: {
    ring: 2,
    ringColor: '#313EF7',
  },
};
const fonts = {
  heading: `'Montserrat', ${base.fonts.heading}`,
  body: `'Montserrat', ${base.fonts.body}`,
  button: `'Montserrat', ${base.fonts.body}`,
};

const config = {
  styles: {
    global: {
      body: {
        bg: 'white',
        color: '#222222',
      },
      input: {
        rounded: 'sm',
      },
    },
  },
  fonts,
  colors,
  components: {
    Button: {
      variants: {
        primary: (props) => ({
          rounded: '3xl',
          ...brandRing,
          color: mode('white', 'black')(props),
          fontSize: 'sm',
          fonts,
          backgroundColor: mode('brand.600', 'brand.500')(props),

          _hover: {
            backgroundColor: mode('brand.500', 'brand.400')(props),
          },

          _active: {
            backgroundColor: mode('brand.400', 'brand.300')(props),
          },
        }),
        // outline: (props) => ({
        //   rounded: '3xl',
        //   ...brandRing,
        //   color: 'brand.500',
        //   fontSize: 'sm',
        //   backgroundColor: 'white',
        //   ringColor: 'brand.500',
        //   _hover: {
        //     backgroundColor: 'brand.500',
        //     color: 'white',
        //   },

        //   _active: {
        //     backgroundColor: 'brand.600',
        //   },
        // }),
      },
    },

    Input: {
      variants: {
        primary: (props) => ({
          rounded: 'md',
          variant: 'outlined',
          ...brandRing,
          borderWidth: '1px',
          ring: 2,
          ringColor: 'brand.500',

          _active: {
            backgroundColor: mode('brand.400', 'brand.300')(props),
          },
        }),
      },
    },
  },
};

const theme = extendTheme(
  config,
  // withDefaultColorScheme({
  //   colorScheme: 'brand',
  //   components: ['Checkbox'],
  // }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select'],
  })
);

export default theme;
