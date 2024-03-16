import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import AdminIcon from "@mui/icons-material/SupervisorAccount";
import TopicIcon from "@mui/icons-material/Topic";
import CarouselIcon from "@mui/icons-material/ViewCarousel";
import StoryIcon from "@mui/icons-material/AutoStories";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionIcon from "@mui/icons-material/Collections";
import ProductIcon from "@mui/icons-material/Inventory";
import OrderIcon from "@mui/icons-material/ProductionQuantityLimits";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// import { useLogout } from "../../../hooks/useLogout";
import AdminBackground from '../../../assets/admin-background.jpg'

const drawerWidth = 240;

const openedMixin = (theme) => ({

  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#F2F2F8",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const { logout } = useLogout();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const icons = [
    <AdminIcon />,
    <TopicIcon />,
    <CarouselIcon />,
    <StoryIcon />,
    <CategoryIcon />,
    <CollectionIcon />,
    <ProductIcon />,
    <OrderIcon />,
  ];
  const routes = [
    "admins",
    "blogsAdmin",
    "carouselsAdmin",
    // "storiesAdmin",
    "categoriesAdmin",
    // "collectionsAdmin",
    // "productsAdmin",
    "ordersAdmin",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "black" }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route, index) => (
            <ListItem key={route} disablePadding sx={{ display: "block" }}>
              <Link to={`/admin/${route}`} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 5,
                    display: "flex",
                    flexDirection: "row", // Display items vertically
                    alignItems: "center", // Center items horizontally
                  }}
                >
                  {/* Array of icons corresponding to each route */}

                  {icons[index]}

                  {/* Link to the corresponding route */}
                  {/* <Link to={`/admin/admins`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, mt: 1 }} />
        </Link> */}
                  <ListItemText
                    primary={route.replace(/Admin$/, "")}
                    sx={{ opacity: open ? 1 : 0, mt: 2, ml: 4 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          <ListItem
            // onClick={() => {
            //   logout();
            // }}
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to={`/admin`} style={{ textDecoration: "none" }}>
              {" "}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 5,
                  display: "flex",
                  flexDirection: "row", // Display items vertically
                  alignItems: "center", // Center items horizontally
                }}
              >
                <LogoutIcon />{" "}
                <ListItemText
                  primary={"logout"}
                  sx={{ opacity: open ? 1 : 0, mt: 2, ml: 4 }}
                />{" "}
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
      {/* <Container
        component="main"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "1000wh",
          height: "100%",
          backgroundImage: `url(${AdminBackground})`, // Use the imported image
          backgroundSize: "cover",
          zIndex: -1, // Move the back ground behind the content
        }}  
      >
     
      </Container> */}
    </Box>
  );
}
