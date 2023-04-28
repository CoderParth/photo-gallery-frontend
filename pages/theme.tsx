import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E1306C", // Instagram red color
    },
    secondary: {
      main: "#FFFFFF", // White color
    },
    background: {
      default: "#000000", // Black color
      paper: "#262626", // Dark gray color for paper surfaces
    },
    text: {
      primary: "#FFFFFF", // White color for text
      secondary: "#8e8e8e", // Light gray color for secondary text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#262626", // Dark gray color for AppBar
        },
      },
    },
  },
})

export default theme
