import React, { useEffect, useState } from "react";
import { Box, Divider, Stack, Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "./projectSlice";
import ProjectHeader from "./ProjectHeader";
import ProjectBanner from "./ProjectBanner";
import DonateBtn from "./DonateBtn";
import { styled } from "@mui/material/styles";
import Discussion from "../comment/Discussion";
import Pitch from "./Pitch";

const TabWrapperStyle = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  position: "absolute",
  bottom: 0,
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

function SingleProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);
  const [currentTab, setCurrentTab] = useState("pitch");

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROJECT_TAB = [
    {
      value: "pitch",
      component: <Pitch />,
    },
    {
      value: "discussion",
      component: <Discussion />,
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mt="30px"
      padding={1}
    >
      <Stack
        width={{ xs: "90vw", md: "75vw" }}
        minHeight="100vh"
        padding={1}
        direction="column"
        justifyContent="space-between"
      >
        <Box width="100%" minheight="80vh" padding={1}>
          <ProjectHeader project={project} />
          <Divider />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            padding={1}
          >
            <ProjectBanner project={project} />
            <DonateBtn project={project} />
          </Stack>
        </Box>

        <Box
          width="100%"
          minheight="50vh"
          sx={{ padding: 1 }}
        >
          <Box sx={{ mb: 3, height: 50, position: "relative" }}>
            <TabWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
              >
                {PROJECT_TAB.map((tab) => (
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
          </Box>
          <Divider />

          {PROJECT_TAB.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Box>
      </Stack>
    </Stack>
  );
}

export default SingleProject;
