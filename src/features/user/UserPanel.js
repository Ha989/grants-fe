import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getCurrentUser } from "./userSlice";
import UserDonations from "./UserDonations";
import UserBookmarked from "./UserBookmarked";
import UserSetting from "./UserSetting";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [currentTab, setCurrentTab] = useState("donations");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const USER_TAB = [
    {
      value: "donations",
      component: <UserDonations />,
    },
    {
      value: "bookmarked",
      component: <UserBookmarked user={user} />,
    },
    {
      value: "settings",
      component: <UserSetting user={user} />,
    },
  ];

  return (
    <Box width="100%"
    minheight="90vh"
    sx={{ border: "1px solid black", padding: 1 }}>
    <Box
      width="100%"
      height="70vh"
      display="flex"
      sx={{ border: "1px solid black"}}
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
   </Box>
  );
}

export default UserPanel;
