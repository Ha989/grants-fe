import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProject } from "./projectSlice";
import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import PayPalButton from "./PayPalButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Donation() {
  const { projectId, userId } = useParams();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [dispatch, projectId]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <Stack direction="column" alignItems="center">
      <Box width={{ xs: "90vw", md: "30vw" }}>
        <Card sx={{ py: 10, px: 3, textAlign: "center", minWidth: 275 }}>
          <Box height={100}>
            <Typography variant="h6">DONATION PAYMENT</Typography>
            <Typography variant="subtitle2" mb={3}>
              Please input the amount you want to donate then click the payment
              button when it appear
            </Typography>
          </Box>
          <Box height={150}>
            <TextField
              fullWidth
              id="standard-number"
              label="Amount must be greater than 0$"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              // value={amount}
              onChange={handleOnChange}
              helperText="0.00$"
            />
          </Box>
          {project && (
            <PayPalScriptProvider
              options={{
                clientId: `${project?.clientID}`,
              }}
            >
              <PayPalButton
                amount={amount}
                userId={userId}
                projectId={projectId}
                project={project}
              />
            </PayPalScriptProvider>
          )}
        </Card>
      </Box>
    </Stack>
  );
}

export default Donation;
