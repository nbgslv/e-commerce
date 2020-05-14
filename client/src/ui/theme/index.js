import { createMuiTheme } from '@material-ui/core/styles';
import NotoSansRegular from './NotoSans-Regular.ttf';
import NotoSansBold from './NotoSans-Bold.ttf';

const notoSansRegular = {
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('Noto Sans'),
    local('NotoSans-Regular'),
    url(${NotoSansRegular}) format('ttf')
  `,
};

const notoSansBold = {
  fontFamily: 'Noto Sans Bold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'normal',
  src: `
    local('Noto Sans'),
    local('NotoSans-Bold'),
    url(${NotoSansBold}) format('ttf')
  `,
};

const palette = {
  primary: { main: '#f99028' },
  secondary: { main: '#2490ff' },
};

const typography = {
  fontFamily: ['"Noto Sans"', '"Roboto"', '"Helvetica"'].join(','),
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [notoSansRegular, notoSansBold],
      },
    },
  },
};

const themeName = 'Sea Buckthorn Dodger Blue Goats';

export default createMuiTheme({ palette, typography, themeName });
