import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getCreator } from "./creatorSlice";
import { Box, Button, Divider, Stack, Typography, Link } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FUpLoadAvatar from "../../components/form/FUpLoadAvatar";
import FUpLoadImage from "../../components/form/FUpLoadImage";
import { fData } from "../../utils/numberFormat";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProjectSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be less than 100 words"),
  description: yup.string().required("description is required"),
  website: yup.string().url().nullable().required("Website is required"),
  team: yup
    .mixed()
    .test("is-array-or-string", "Team must be an array or string", (value) => {
      return Array.isArray(value) || typeof value === "string";
    })
    .required("Team is required"),
  logo: yup
    .mixed()
    .required("Logo is required")
    .test("fileType", "Invalid file format", (value) => {
      if (value && value instanceof File) {
        return true;
      }
      return false;
    }),
  banner: yup
    .mixed()
    .required("Banner is required")
    .test("fileType", "Invalid file format", (value) => {
      if (value && value instanceof File) {
        return true;
      }
      return false;
    }),
  video: yup
    .string()
    .url("Video must be a valid video link")
    .required("Pitch video is required"),
  clientID: yup.string().required("Bank Detail is required"),
});




function CreateProject() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.creator.isLoading);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const creator = useSelector((state) => state.creator.creator);

  const defaultValues = {
    name: "",
    title: "",
    description: "",
    website: "",
    team: "",
    logo: "",
    banner: "",
    video: "",
    clientID: "",
  };

  const [teamMembers, setTeamMembers] = useState([]);

  const handleAddMember = () => {
    setTeamMembers((prevMembers) => [...prevMembers, ""]);
  };

  const handleRemoveMember = (index) => {
    setTeamMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(index, 1);
      return updatedMembers;
    });
  };

  const handleMemberChange = (index, value) => {
    setTeamMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[index] = value;
      return updatedMembers;
    });
  };

  useEffect(() => {
    dispatch(getCreator())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user:", error);
      });
  }, [dispatch]);
  
  useEffect(() => {
    if (!loading && creator && creator.role !== "creator") {
      navigate("/");
    }
  }, [navigate, creator, loading]);

  const methods = useForm({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = ({
    creatorId,
    name,
    title,
    description,
    website,
    banner,
    logo,
    team,
    video,
    clientID,
  }) => {
    dispatch(
      createProject({
        creatorId: creator._id,
        name,
        title,
        description,
        website,
        banner,
        logo,
        team: teamMembers,
        video,
        clientID,
      })
    );
  };
  const handleDrop = useCallback(
    (acceptedFiles, type) => {
      const file = acceptedFiles[0];

      if (file) {
        if (type === "logo") {
          setValue(
            "logo",
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        }

        if (type === "banner") {
          setValue(
            "banner",
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        }
      }
    },
    [setValue]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h5"
          mt={5}
          textAlign="center"
          fontWeight="bolder"
          color="primary"
        >
          SUBMIT YOUR PROJECT
          <Divider />
        </Typography>
        <Stack mt={10}>
          <Box>
            <Typography variant="subtitle1" fontFamily="sans-serif">
              Upload Your Logo
            </Typography>
            <FUpLoadAvatar
              name="logo"
              accept="image/*"
              maxSize={3145728}
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles, "logo")}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>
          <Divider />
          <Box sx={{ mt: 5 }}>
            <Typography variant="subtitle1" fontFamily="sans-serif">
              Upload your Banner
            </Typography>
            <FUpLoadImage
              name="banner"
              accept="image/*"
              maxSize={3145728}
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles, "banner")}
            />
          </Box>
        </Stack>
        <Box
          sx={{
            mt: 10,
          }}
        >
          <Box mt={5}>
            <FTextField name="name" label="Name" />
          </Box>
          <Box mt={5}>
            <FTextField name="title" label="Title" />
          </Box>
          <Box mt={5}>
            <FTextField name="description" label="Description" />
          </Box>
          <Box mt={5}>
            <FTextField name="website" label="Website" />
          </Box>
          <Box mt={5}>
            <Typography variant="subtitle2" mb={1}>
              Click Add Team to add your team member
            </Typography>
            {teamMembers.map((member, index) => (
              <Box key={index} display="flex" alignItems="center" mt={2}>
                <FTextField
                  name="team"
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  placeholder={`Team Member ${index + 1}`}
                />
                <Button onClick={() => handleRemoveMember(index)}>
                  Remove
                </Button>
              </Box>
            ))}
            <Button onClick={handleAddMember}>Add Team</Button>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" mb={1}>
              Please record your project pitch video then upload it on your
              youtube channel then paste the link here
            </Typography>
            <FTextField name="video" label="Video" />
          </Box>
          <Box mt={5}>
            <Typography variant="subtitle2" mb={1}>
              How to get your Paypal clientId? Check out {" "}
              <Link
                href="https://www.upwork.com/resources/paypal-client-id-secret-key"
                target="_blank"
              >
                here
              </Link>{" "}
              to get tutorial
            </Typography>
            <FTextField name="clientID" label="Your Paypal clientID" />
          </Box>
        </Box>
        <Box mt={3}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Create
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default CreateProject;
