import { Container, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByCreator } from "./creatorSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmModal from "./ConfirmDelete";

function CreatorProjects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.creator.projects);
  const [openForm, setOpenForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  
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
    const projectId = params?.row?._id;
    setSelectedProject(projectId);
  };
  
  const handleDelete = () => {
    console.log("ok");
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
      description: "This column has a value getter and is not sortable.",
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
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteClick(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <ConfirmModal
        open={confirmModal}
        // name={name}
        handleClose={() => {
          setConfirmModal(false);
        }}
        action={handleDelete}
      />
      <div style={{ height: 400, width: "100%" }}>
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
      </div>
    </Container>
  );
}

export default CreatorProjects;
