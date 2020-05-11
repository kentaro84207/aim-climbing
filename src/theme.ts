import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h5: {
        marginBottom: 20,
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
