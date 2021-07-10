import { createTheme } from '@shopify/restyle'

const palette = {
    purpleLight: '#8C6FF7',
    purplePrimary: '#5A31F4',
    purpleDark: '#3F22AB',
    wellRed: "#ba3833",
    mustard: "#fde14c",
    greenLight: '#56DCBA',
    greenPrimary: '#0ECD9D',
    greenDark: '#0A906E',
    scorpion: '#5a5a5a',
    wildSand: '#f6f6f6',
    black: '#0B0B0B',
    white: '#F0F2F3',
};


const theme = createTheme({
    colors: {
        mainText: palette.wellRed,
        mainBackground: palette.wildSand,
        mainButton: palette.wellRed,
        secondaryText: palette.scorpion,
        cardPrimaryBackground: palette.purplePrimary,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
});

export type Theme = typeof theme;
export default theme;