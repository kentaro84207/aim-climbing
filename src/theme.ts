import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: red,
  },
  overrides: {
    MuiTypography: {
      h5: {
        marginBottom: 20,
      },
      h6: {
        fontWeight: 600,
      },
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 16,
        },
      },
    },
  },
});
