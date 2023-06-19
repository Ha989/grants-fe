import { Avatar, Box, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import DonationModel from "./DonationModel";
import { useState } from "react";

function RecentDonationsCard({ projects }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  const handleClick = (recentId) => {
    setSelectedDonationId(recentId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const flattenedDonations = projects?.flatMap((project) => project.donations);

  const sortedData = flattenedDonations?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Get the newest 10 donations or less if there are fewer donations
  const recentDonations = sortedData?.slice(0, 6);

  return (
    <div>
      <Box
        borderRadius={1}
        minHeight={300}
        minWidth={{ xs: 350, md: 500 }}
        backgroundColor="#f5f5f5"
        textAlign="center"
        p={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Typography variant="h7" fontWeight="bold" color="#001197" flex={1}>
            User
          </Typography>
          <Typography variant="h7" fontWeight="bold" color="#001197" flex={1}>
            Amount
          </Typography>
          <Typography variant="h7" fontWeight="bold" color="#001197" flex={1}>
            Status
          </Typography>
          <Typography variant="h7" fontWeight="bold" color="#001197" flex={1}>
            Project
          </Typography>
        </Box>
        <Divider />
        {recentDonations &&
          recentDonations.map((recent) => {
            return (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                mt={2}
                alignItems="center"
                onClick={() => handleClick(recent._id)}
                key={recent._id}
              >
                <Box display="flex" alignItems="center" flex={1} flexDirection={{ xs: "column", md: "row"}}>
                  <Avatar
                    src={recent?.userId?.avatarUrl}
                    alt={recent?.userId?.name}
                    sx={{ width: 35, height: 35 }}
                  />
                  <Typography color="#338fff">
                    {recent?.userId?.name}
                  </Typography>
                </Box>
                <Typography flex={1}>${recent?.amount}</Typography>
                <Typography
                  style={{ color: recent?.isConfirm ? "green" : "red" }}
                  flex={1}
                >
                  {recent?.isConfirm ? "Confirm" : "Unconfirm"}
                </Typography>
                <Typography flex={1}>{recent?.projectId?.name}</Typography>
              </Box>
            );
          })}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <DonationModel
          donationId={selectedDonationId}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default RecentDonationsCard;
