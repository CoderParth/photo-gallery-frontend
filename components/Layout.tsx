// components/ResponsiveLayout.tsx
import * as React from "react"
import { useState } from "react"
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material"
import styled from "@emotion/styled"
import MenuIcon from "@mui/icons-material/Menu"
import Metrics from "@/components/Metrics"

const drawerWidth = 240

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`

const DrawerContainer = styled("div")`
  width: ${drawerWidth}px;
`

type Props = {
  children: React.ReactNode
}

const ResponsiveLayout: React.FC<Props> = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(!isMobile)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Photo Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {!isMobile && <Toolbar />}
        <DrawerContainer>
          <Divider />

          {/*  metrics content goes here */}
          <Box
            sx={{
              display: "flex",
              marginTop: "33%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Metrics />
          </Box>
        </DrawerContainer>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Box>{children}</Box>
        </Container>
      </Box>
    </Box>
  )
}

export default ResponsiveLayout
