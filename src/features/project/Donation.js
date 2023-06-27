import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDonation, getSingleProject } from "./projectSlice";
import { Box, Card, Stack, TextField, Typography } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import SendIcon from "@mui/icons-material/Send";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
// import e from "cors";

function Donation() {
  const { projectId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  // const loading = useSelector((state) => state.project.isLoading);
  const project = useSelector((state) => state.project.currentProject);
  console.log("amount", amount);

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
              {amount > 0 && (
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    let status = false;
                    return actions.order.capture().then((details) => {
                      if (details.status === "COMPLETED") {
                        status = true;
                      }
                      const capturedAmount =
                        details.purchase_units[0].amount.value;
                      try {
                        dispatch(
                          createDonation({
                            projectId,
                            userId,
                            amount: Number(capturedAmount),
                            status,
                          })
                        );
                        setTimeout(() => {
                          navigate("/users/account");
                        }, 3000);
                      } catch (error) {
                        console.log(error);
                      }
                      // const name = details.payer.name.given_name;
                      toast.success(
                        `Your transaction completed. Thank you for your support!`
                      );
                    });
                  }}
                />
              )}
            </PayPalScriptProvider>
          )}
        </Card>
      </Box>
    </Stack>
  );
}

export default Donation;
