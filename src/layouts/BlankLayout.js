import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../components/Logo";


function BlankLayout() {
    return (
        <Stack minHeight="100vh" justifyContent="center" alignItems="center">
            <Logo sx={{ width: 100, height: 100, mb: 5}}/>

            <Outlet />
        </Stack>
      )
}

export default BlankLayout;