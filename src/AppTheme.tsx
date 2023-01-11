import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    info: {
      main: "#6B6B6B",
    },
    secondary: {
      main: "#FF9600",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: "16px !important",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        wave: true,
      },
    },
  },
});

export default theme;
