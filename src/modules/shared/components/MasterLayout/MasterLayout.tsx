import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Fade,
  Backdrop,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarComponent from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  // Set collapsed state based on screen size on initial load
  useEffect(() => {
    setCollapsed(isMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const drawerWidth = collapsed ? 75 : 240;

  const renderSidebar = () => (
    <SidebarComponent onToggle={toggleSidebar} collapsed={collapsed} />
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
            BackdropComponent: Backdrop,
            BackdropProps: {
              timeout: 500,
            },
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
            },
            zIndex: theme.zIndex.appBar + 1,
          }}
        >
          {renderSidebar()}
        </Drawer>
      ) : (
        /* Desktop Sidebar */
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: "hidden",
              },
            }}
            open
          >
            {renderSidebar()}
          </Drawer>
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* App Bar (Mobile only) */}
        {isMobile && (
          <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
              display: { xs: "block", md: "none" },
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ width: "100%" }}>
                <Navbar />
              </Box>
            </Toolbar>
          </AppBar>
        )}

        {/* Desktop Navbar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "100%",
            zIndex: theme.zIndex.appBar,
            padding: theme.spacing(2, 2, 0, 2),
          }}
        >
          <Navbar />
        </Box>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: theme.spacing(isMobile ? 2 : 3),
            paddingTop: isMobile ? theme.spacing(2) : theme.spacing(2),
            backgroundColor: theme.palette.background.default,
            transition: theme.transitions.create(["padding"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Fade in={true} timeout={500}>
            <Box>
              <Outlet />
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
