import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

  const [currentTab, setCurrentTab] = useState("donations");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const USER_TAB = [
    {
      value: "donations",
      component: <UserDonations />,
    },
    {
      value: "bookmarked",
      component: <UserBookmarked />,
    },
    {
      value: "settings",
      component: <UserSetting />,
    },
  ];

  return (
    <Stack width="98vw"
    minHeight="90vh"
    mt={10}>
    <Box
      width="100%"
      minHeight="70vh"
      display="flex"
      justifyContent="center"
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
