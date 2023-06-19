import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Avatar,
  Badge,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logo from "../../components/Logo";
import { useEffect } from "react";
import NotificationCard from "../notification/NotificationCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countNewNotifications,
  getAllNotificationOfUser,
  updateNotification,
} from "../notification/notificationSlice";
const drawerWidth = 180;

function CreatorPage(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notificationEl, setNotificationEl] = React.useState(null);
  const [notifiDialog, setnotifiDialog] = useState(false);
  const creator = auth?.creator;
  const [page, setPage] = useState(1);
  const totalPage = useSelector((state) => state.notification.totalPage);

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const handleChange = (e, value) => {
    setPage(value);
  };

  const count = useSelector((state) => state.notification.count);

  useEffect(() => {
    const fetchNewNotifications = async () => {
      try {
        dispatch(countNewNotifications());
      } catch (error) {
        console.error("Error fetching new notifications count:", error);
      }
    };
    setTimeout(async () => {
      await fetchNewNotifications();
    }, 60000); // 1 minute

    return () => {
      clearTimeout(fetchNewNotifications);
    };
  }, [dispatch]);

  useEffect(() => {
    if (creator) dispatch(getAllNotificationOfUser({ page }));
  }, [creator, dispatch, page]);

  const handleDialogOpen = (event) => {
    dispatch(updateNotification());
    setNotificationEl(event.currentTarget);
    setnotifiDialog(true);
  };

  useEffect(() => {
    navigate("/creators/dashboard");
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    auth.logout();
  };

  const drawer = (
    <div>
      <Box height="50px" textAlign="center" mt={2} ml={9}>
        <Logo />
      </Box>
      <Divider />
      <List>
        <MenuItem component={RouterLink} to="/creators/dashboard">
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<HomeIcon />}
          />
          <Typography color="primary" fontWeight="bold">
            Dashboard
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to="/creators/projects">
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<CategoryIcon />}
          />
          <Typography color="primary" fontWeight="bold">
            Projects
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to="/creators/donations">
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<ReceiptLongIcon />}
          />
          <Typography color="primary" fontWeight="bold">
            Donations
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to="/creators/settings">
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<SettingsIcon />}
          />
          <Typography color="primary" fontWeight="bold">
            Settings
          </Typography>
        </MenuItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <WidgetsIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            color="#fff"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Grants
          </Typography>
          <Box flexGrow={1} />
          <Box mr={2} onClick={handleDialogOpen}>
            <IconButton aria-label="show 1 new notifications" color="inherit">
              <Badge badgeContent={count} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Popover
            open={notifiDialog}
            onClose={() => setnotifiDialog(false)}
            anchorEl={notificationEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Stack style={{ minHeight: 400, width: 350 }} alignItems="center">
              <NotificationCard
                notifications={notifications}
                totalPage={totalPage}
                handleChange={handleChange}
              />
            </Stack>
          </Popover>
          <Box>
            <Avatar
              src={auth?.creator?.avatarUrl}
              alt={auth?.creator?.name}
              sx={{ width: 40, height: 40 }}
            />
          </Box>
          <Box onClick={() => handleLogout()}>
            <IconButton size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
            Logout
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

CreatorPage.propTypes = {
  window: PropTypes.func,
};

export default CreatorPage;
