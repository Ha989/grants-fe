import React from "react";
import { Link, Typography } from "@mui/material";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1} mb={2}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/nguyen-ha-3b515818a/">
       Ha nguyen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;