import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";
import CreatorPage from "../features/creator/CreatorPage";

function CreatorLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CreatorPage />
      <AlertMsg />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default CreatorLayout;
