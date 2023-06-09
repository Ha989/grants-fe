import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";
import CreatorPanel from "../features/creator/CreatorPanel";

function CreatorLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CreatorPanel />
      <AlertMsg />
 
      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
};

export default CreatorLayout;