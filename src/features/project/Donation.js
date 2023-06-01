import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createDonation, getSingleProject } from './projectSlice';
import { Box, Card, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

function Donation() {
  const { projectId, userId } = useParams();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const loading = useSelector((state) => state.project.isLoading);
  const project = useSelector((state) => state.project.currentProject)
  
  useEffect(() => {
    dispatch(getSingleProject(projectId))
  }, []);
  const handleClickDonation =  async () => {
      try {
        dispatch(createDonation({ projectId , userId , amount: Number(amount)}));
      } catch (error) {
        console.log(error)
      }
  }

  const handleOnChange = (e) => {
     setAmount(e.target.value)
  }
    
  return (
    <Stack direction="column" alignItems="center">
    <Box width={{ xs: "90vw", md: "30vw"}}>
      <Card sx={{ py: 10, px: 3, textAlign: "center", minWidth: 275}}>
      <Box height={150}>
        <Typography variant='h6'>DONATION PAYMENT</Typography>
       <Typography variant='subtitle2' mb={3}>Please send money to this bank account</Typography>
       <Typography variant='h4' color="primary">{project?.bankDetail}</Typography>
       </Box>
       <Box height={150}>
       <TextField
       fullWidth
          id="filled-number"
          label="Amount in $"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleOnChange}
        />
        </Box>
        <LoadingButton height="100"
         size="small"
         fullWidth
         onClick={handleClickDonation}
         endIcon={<SendIcon />}
         loading={loading}
         loadingPosition="end"
         variant="contained"
        >
         Confirm
        </LoadingButton>
        </Card>
        </Box>
        </Stack>
  )
}

export default Donation;