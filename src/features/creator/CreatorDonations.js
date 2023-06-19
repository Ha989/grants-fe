import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Divider, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDonationsByCreator } from "./creatorSlice";
import { useState } from "react";
import DonationModel from "./DonationModel";
import { green, red } from "@mui/material/colors";

function CreatorDonations() {
  const dispatch = useDispatch();
  const donations = useSelector((state) => state.creator.donations);
  const [handleOpen, setHandleOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState();

  useEffect(() => {
    dispatch(getDonationsByCreator());
  }, [dispatch]);

  const handleDonation = (params) => {
    const donationId = params.row._id;
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
      headerClassName: "header-name",
      headerCellClassName: "header-name",
      valueGetter: (params) => params.row.userId.name,
    },
    {
      field: "userId.email",
      headerName: "Email",
      minWidth: 200,
      headerClassName: "bold-header",
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
      renderCell: (params) => (
        <div style={{ color: params.value ? green[500] : red[500] }}>
          {params.value ? "Confirmed" : "Unconfirmed"}
        </div>
      ),
    },
  ];

  return (
    <Box ml={{ xs: 5, md: 30}}>
      <Typography variant="h5" color="primary" mb={5}>
        Donation Receipts Table
        <Divider />
      </Typography>
      <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          width: "90%",
        }}>
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
            // checkboxSelection
            onRowClick={handleDonation}
          />
        )}

        <Modal
          open={handleOpen}
          onClose={closeModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DonationModel donationId={selectedDonation} />
        </Modal>
      </Box>
      </Box>
  );
}

export default CreatorDonations;
