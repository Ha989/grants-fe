import * as React from "react";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Link as RouterLink } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Avatar from "@mui/material/Avatar";
import { Button, DialogContent, Paper, Popover, Stack } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useState } from "react";
import NotificationCard from "../features/notification/NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  countNewNotifications,
  getAllNotificationOfUser,
  updateNotification,
} from "../features/notification/notificationSlice";

function MainHeader() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notificationEl, setNotificationEl] = React.useState(null);
  const [notifiDialog, setnotifiDialog] = useState(false);
  const [skip, setSkip] = useState(0);
  const user = auth?.user;
  const creator = auth?.creator;

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const count = useSelector((state) => state.notification.count);

  useEffect(() => {
    if (auth?.user || auth?.creator) {
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
    }
  }, [dispatch, auth?.user, auth?.creator]);

  useEffect(() => {
    if (auth?.user || auth?.creator)
      dispatch(getAllNotificationOfUser({ skip }));
  }, [auth, dispatch, skip]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 10);
  };

  const handleDialogOpen = (event) => {
    dispatch(updateNotification());
    setNotificationEl(event.currentTarget);
    setnotifiDialog(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    auth.logout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth?.user ? (
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<ContactMailIcon />}
          />
          {user?.email}
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<ContactMailIcon />}
          />
          {creator?.email}
        </MenuItem>
      )}

      <MenuItem
        component={RouterLink}
        to={auth?.creator ? "/creators/account" : "/users/account"}
      >
        <IconButton
          size="large"
          color="primary"
          disableRipple={true}
          children={<AssignmentIndIcon />}
        />
        Profile
      </MenuItem>

      <MenuItem onClick={() => handleLogout()}>
        <IconButton
          size="large"
          color="primary"
          disableRipple={true}
          children={<LogoutIcon />}
        />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth?.user || auth?.creator ? (
        <div>
          <MenuItem onClick={handleDialogOpen}>
            <IconButton
              size="large"
              aria-label="show 1 new notifications"
              color="primary"
            >
              <Badge badgeContent={count} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography color="primary">Notifications</Typography>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            {auth?.user ? (
              <Stack direction="row" alignItems="center">
                <Avatar
                  onClick={handleProfileMenuOpen}
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography color="primary" ml={3}>
                  {user?.name}
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center">
                <Avatar
                  onClick={handleProfileMenuOpen}
                  src={creator?.avatarUrl}
                  alt={creator?.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography color="primary" ml={3}>
                  {creator?.name}
                </Typography>
              </Stack>
            )}
          </MenuItem>
        </div>
      ) : (
        <MenuItem component={RouterLink} to="/auth/login">
          <IconButton
            size="large"
            color="primary"
            disableRipple={true}
            children={<LoginIcon />}
          />
          Login
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            color="primary"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Grants
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {auth?.user || auth?.creator ? (
            <div>
              <Box sx={{ display: { xs: "none", md: "flex" } }} mr={1}>
                <IconButton
                  size="large"
                  aria-label="show 1 new notifications"
                  color="primary"
                  onClick={handleDialogOpen}
                >
                  <Badge badgeContent={count} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Box>
                  {auth?.user ? (
                    <Avatar
                      onClick={handleProfileMenuOpen}
                      src={user.avatarUrl}
                      alt={user.name}
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar
                      onClick={handleProfileMenuOpen}
                      src={creator?.avatarUrl}
                      alt={creator?.name}
                      sx={{ width: 40, height: 40 }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="primary"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </div>
          ) : (
            <MenuItem component={RouterLink} to="/auth/login">
              <IconButton
                size="large"
                color="primary"
                disableRipple={true}
                children={<LoginIcon />}
              />
              <Typography color="primary">Login</Typography>
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
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
        <Stack style={{ minHeight: 400, width: 350 }} alignItems="center" p={1}>
          <NotificationCard notifications={notifications} />
          <Button onClick={handleLoadMore}>Load more</Button>
        </Stack>
      </Popover>
    </Box>
  );
}

export default MainHeader;
