import { Alert, Box, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";

function VerificationPage() {
  const param = useParams();
  const [validUrl, setValidUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://main-grants-2023.netlify.app/auth/${param.id}/verify/${param.code}`;
    setValidUrl(url);
    const verifyEmail = async () => {
      try {
        const response = await apiService.post(url);
        const { data } = response;
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [param]);

  return (
    <>
      <div >
        {isLoading ? (
          <LoadingScreen /> // Render the loading indicator while waiting for verification
        ) : (
          <>
            {validUrl ? (
              <Box
                maxWidth="100%"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Alert severity="success">Your email has been verified!</Alert>
                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  to="/auth/login"
                >
                  Login
                </Link>
              </Box>
            ) : (
              <Alert severity="error">404 Not found</Alert>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default VerificationPage;
