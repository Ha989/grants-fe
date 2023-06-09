import React, { useEffect, useState } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserDonations from "./UserDonations";
import UserBookmarked from "./UserBookmarked";
import UserSetting from "./UserSetting";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

const TabWrapperStyle = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  position: "absolute",
  top: 70,
  zIndex: 9,
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("sm")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function UserPanel() {
  const [currentTab, setCurrentTab] = useState("donations");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    dispatch(getUser())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching user:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && user && user.role !== "user") {
      navigate("/");
    }
  }, [isLoading, user, navigate]);

  const USER_TAB = [
    {
      value: "donations",
      component: <UserDonations />,
      icon: <ReceiptLongIcon />,
    },
    {
      value: "bookmarked",
      component: <UserBookmarked />,
      icon: <FavoriteBorderIcon />,
    },
    {
      value: "settings",
      component: <UserSetting />,
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Stack width="98vw" minHeight="90vh" mt={10}>
      <Box
        width="100%"
        minHeight="70vh"
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <TabWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {USER_TAB.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.value}
              />
            ))}
          </Tabs>
        </TabWrapperStyle>
        {USER_TAB.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Box>
    </Stack>
  );
}

export default UserPanel;
