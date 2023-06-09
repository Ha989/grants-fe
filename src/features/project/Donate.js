import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "./PayPalButton";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    height: "550px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


function Donate({ project, userId }) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAmount(0)
  };


  const handleOnChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleDonate = () => {
    if (!userId) {
      navigate("/auth/login");
    }
  };


  return (
    <div>
      <Box onClick={handleClickOpen}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={handleDonate}
        >
          DONATE
        </Button>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          textAlign="center"
          color="primary"
        >
          DONATION PAYMENT
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography gutterBottom textAlign="center" mb={10}>
            Please input the amount you want to donate then click the payment
            button when it appear
          </Typography>
          <Box mb={5}>
            <TextField
              fullWidth
              name="amount"
              id="standard-number"
              label="Amount must be greater than 0$"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              helperText="0.00$"
              onChange={handleOnChange}
            />
          </Box>
          <Box mt={10}>
          {amount ? (
            amount > 0 && (
              <PayPalScriptProvider
                options={{
                  clientId: `${project?.clientID}`,
                }}
                fullWidth
              >
                <PayPalButton
                  amount={amount}
                  projectId={project._id}
                  userId={userId}
                />
              </PayPalScriptProvider>
            )
          ) : (
            <PayPalScriptProvider
            options={{
              clientId: `${project?.clientID}`,
            }}
            style={{ layout: "horizontal" }}
          >
             <PayPalButtons disabled/>
          </PayPalScriptProvider>
          )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default Donate;
