import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDonation, getSingleDonation } from './creatorSlice';
import { useState } from 'react';


const style = {
    width: '350px',
    height: '400px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid green',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };


function DonationModel({ donationId }) {
    const dispatch = useDispatch();
    const donation = useSelector((state) => state.creator.donation);
    
   
    useEffect(() => {
        dispatch(getSingleDonation(donationId));
        console.log("donationId", donationId)
    }, [dispatch, donationId])
    
    const isConfirm = donation?.isConfirm;

    const handleConfirmDonation = () => {
        dispatch(confirmDonation(donationId));
        console.log("donationId", donationId)
    }
    
  return (
    <>
      { donation && (
        <Box sx={style} textAlign="center" justifyContent="space-between">
         <Typography color="primary" id="keep-mounted-modal-title" variant="h5" component="h2">
            Donation
          </Typography>
          <Divider />
          <Typography color="primary" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
           Project:
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar
                  src={donation?.projectId.logo}
                  alt={donation?.projectId.name}
                  sx={{ width: 40, height: 40 }}
                />
          <Typography variant='h5' ml={2}>
          { donation?.projectId.name }
          </Typography>
          </Box>
          <Typography color="primary"  id="keep-mounted-modal-description" sx={{ mt: 2 }}>
           Donated By:
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar
                  src={donation?.userId.avatarUrl}
                  alt={donation?.userId.name}
                  sx={{ width: 40, height: 40 }}
                />
          <Typography variant='h5' ml={2}>
          { donation?.userId.name }
          </Typography>
          </Box>
          <Typography color="primary"  id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Amount: 
          </Typography>
          <Typography variant='h5' sx={{ mb: 2 }}>
          { donation?.amount} $
          </Typography>
          
           
          <Button variant='contained' disabled={isConfirm} onClick={handleConfirmDonation}>
            Confirm
          </Button>
          </Box>
)}
</>
  )
}

export default DonationModel;