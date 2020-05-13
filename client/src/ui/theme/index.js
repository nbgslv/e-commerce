import { createMuiTheme } from '@material-ui/core/styles';
import NotoSansBold from './NotoSans-Bold.ttf';
import NotoSansRegular from './NotoSans-Regular.ttf';

const notoSans = {
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Noto Sans'),
    local('NotoSans-Regular'),
    url(${NotoSansRegular}) format('ttf')
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
        '@font-face': [notoSans],
      },
    },
  },
};

const themeName = 'Sea Buckthorn Dodger Blue Goats';

export default createMuiTheme({ palette, typography, themeName });
