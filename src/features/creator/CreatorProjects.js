import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProjectsByCreator } from "./creatorSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmModal from "./ConfirmDelete";
import EditModal from "./EditModal";

function CreatorProjects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.creator.projects);
  const [openForm, setOpenForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    dispatch(getProjectsByCreator());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteClick = (params) => {
    const projectId = params.row._id;
    setConfirmModal(true);
    setSelectedProject(projectId);
  };
  const handleEditClick = (params) => {
    setOpenForm(true);
    const projectId = params?.row._id;
    const project = projects.find((project) => project._id === projectId);
    setEditProject(project);
  };

  const handleDelete = () => {
    dispatch(deleteProject({ projectId: selectedProject }));
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "logo",
      headerName: "Logo",
      width: 90,
      align: "start",
      renderCell: (params) => (
        <div>
          {params.value && (
            <img src={params.value} alt="Logo" width={40} height={40} />
          )}
        </div>
      ),
    },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "currentRaised",
      headerName: "Raised",
      type: "number",
      width: 180,
    },
    {
      field: "totalBookmarks",
      headerName: "Bookmarked",
      type: "number",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      type: "number",
      width: 220,
      valueGetter: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "Edit",
      headerName: "Edit",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditClick(params)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      description: "You only can delete your project when there is $0 money raised",
      sortable: false,
      width: 90,
      renderCell: (params) =>
        projects?.map((project) => {
          if (project?.currentRaised === 0) {
            return (
              <IconButton onClick={() => handleDeleteClick(params)}>
                <DeleteIcon />
              </IconButton>
            );
          }
          return null;
        }),
    },
  ];

  return (
    <Box ml={{ xs: 5, md: 30 }}>
      <Typography variant="h5" color="primary" mb={5}>
        Projects Control
        <Divider />
      </Typography>
      <ConfirmModal
        open={confirmModal}
        handleClose={() => {
          setConfirmModal(false);
        }}
        action={handleDelete}
      />
      <EditModal
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
        project={editProject}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          width: "90%",
        }}
      >
        {projects && (
          <DataGrid
            rows={projects}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </Box>
    </Box>
  );
}

export default CreatorProjects;
