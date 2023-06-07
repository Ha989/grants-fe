import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDonationsByCreator } from "./creatorSlice";
import { useState } from "react";
import DonationModel from "./DonationModel";



function CreatorDonations() {
  const dispatch = useDispatch();
  const donations = useSelector((state) => state.creator.donations);
  const [handleOpen, setHandleOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState();



  useEffect(() => {
    dispatch(getDonationsByCreator());
  }, [dispatch]);


  const handleDonation = (params) => {
    const donationId = params.row._id
    setHandleOpen(true);
    setSelectedDonation(donationId);
  };

  const closeModal = () => {
    setHandleOpen(false);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userId.name",
      headerName: "Name",
      minWidth: 180,
      valueGetter: (params) => params.row.userId.name,
    },
    {
      field: "userId.email",
      headerName: "Email",
      minWidth: 200,
      valueGetter: (params) => params.row.userId.email,
    },
    { field: "amount", headerName: "Amount in $", type: "number", width: 150 },
    {
      field: "createdAt",
      headerName: "Date",
      type: "datetime",
      width: 150,
      valueGetter: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "projectId.name",
      headerName: "Project",
      width: 180,
      valueGetter: (params) => params.row.projectId.name,
    },
    {
      field: "isConfirm",
      headerName: "Status",
      width: 150,
      valueFormatter: (params) => (params.value ? "Confirmed" : "Unconfirmed"),
    },
  ];

  return (
    <Container>
    <Typography variant="h5" color="primary" mb={5} ml={6}>Donation Receipts Table</Typography>
    <Box
      style={{ height: 400, width: "70vw" }} ml={6}
    >
      {donations && (
        <DataGrid
          rows={donations}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowClick={handleDonation}
        />
      )}


       <Modal open={handleOpen} onClose={closeModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DonationModel donationId={selectedDonation}/>
      </Modal>
    </Box>
    </Container>
  );
}

export default CreatorDonations;
