import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDonation, getSingleProject } from "./projectSlice";
import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

function Donation() {
  const { projectId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const loading = useSelector((state) => state.project.isLoading);
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [dispatch, projectId]);

  const handleClickDonation = async () => {
    try {
      dispatch(createDonation({ projectId, userId, amount: Number(amount) }));
      setTimeout(() => {
        navigate("/users/account");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const roundedValue = parseFloat(sanitizedValue).toFixed(2);
    setAmount(roundedValue);
  };

  return (
    <Stack direction="column" alignItems="center">
      <Box width={{ xs: "90vw", md: "30vw" }}>
        <Card sx={{ py: 10, px: 3, textAlign: "center", minWidth: 275 }}>
          <Box height={150}>
            <Typography variant="h6">DONATION PAYMENT</Typography>
            <Typography variant="subtitle2" mb={3}>
              Please send money to this bank account
            </Typography>
            <Typography variant="h5" color="primary">
              {project?.bankDetail}
            </Typography>
          </Box>
          <Box height={150}>
            <TextField
              id="standard-number"
              label="Amount must be greater than 0$"
              // type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleOnChange}
              helperText="0.00$"
              inputProps={{
                step: '0.01'
              }}
            />
          </Box>

          <LoadingButton
            height="100"
            size="small"
            fullWidth
            onClick={handleClickDonation}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            disabled={amount <= 0}
          >
            Confirm
          </LoadingButton>
        </Card>
      </Box>
    </Stack>
  );
}

export default Donation;
