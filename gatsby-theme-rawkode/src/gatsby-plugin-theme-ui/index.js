import nightOwl from '@theme-ui/prism/presets/night-owl.json';
import colors from './colors';
import headings from './headings';

const transition = '0.2s ease-out';
const systemFonts = 'Bitter, Noto Color Emoji';

export default {
  initialColorMode: `dark`,
  colors,
  fonts: {
    body: systemFonts,
    heading: systemFonts,
    monospace: 'Cascadia Code, Roboto Mono, monospace'
  },
  fontSizes: [12, 14, 16, 24, 28, 36, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em'
  },
  breakpoints: [['phone', 540], ['tablet', 735], ['desktop', 1440]],
  transition,
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      ...headings
    },
    ...headings,
    p: {
      my: 4
    },
    a: {
      color: 'primary',
      transition: `color ${transition}`,
      textDecoration: 'none',
      ':hover,:focus': {
        color: 'secondary'
      }
    },
    pre: {
      ...nightOwl,
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      tabSize: 4,
      hyphens: `none`,
      overflow: `auto`,
      borderRadius: 6,
      p: 3,
      my: 4
    },
    inlineCode: {
      color: `secondary`,
      background: `rgba(233, 218, 172, 0.15)`,
      borderRadius: 3,
      px: `0.4rem`,
      py: `0.2rem`
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    }
  }
};
