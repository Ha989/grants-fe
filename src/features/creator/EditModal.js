import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import FUpLoadAvatar from "../../components/form/FUpLoadAvatar";
import { fData } from "../../utils/numberFormat";
import FUpLoadImage from "../../components/form/FUpLoadImage";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { updateProject } from "./creatorSlice";
import * as yup from "yup";
import { Link } from "react-router-dom";

const updateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function EditModal({ open, handleClose, project }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.creator.isLoading);

  const defaultValues = {
    name: project?.name,
    title: project?.title,
    description: project?.description,
    team: project?.team,
    logo: project?.logo,
    banner: project?.banner,
    website: project?.website,
    video: project?.video,
    clientID: project?.clientID,
  };
  

  const [teamMembers, setTeamMembers] = useState([]);
  const newTeamArray = [...(defaultValues?.team || []), ...teamMembers];

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

  const methods = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = ({
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
      updateProject({
        projectId: project._id,
        name,
        title,
        description,
        website,
        banner,
        logo,
        team: newTeamArray,
        video,
        clientID,
      })
    );
  };

  useEffect(() => {
    if (defaultValues.logo) {
      setValue("logo", defaultValues.logo); // Pass the URL string directly
    }
    if (defaultValues.banner) {
      setValue("banner", defaultValues.banner);
    }
  }, [defaultValues.logo, setValue, defaultValues.banner]);

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
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <DialogTitle color="primary" textAlign="center">
          EDIT YOUR PROJECT
          <Divider />
        </DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack>
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
                  onDrop={(acceptedFiles) =>
                    handleDrop(acceptedFiles, "banner")
                  }
                />
              </Box>
            </Stack>
            <Box
              sx={{
                mt: 10,
              }}
            >
              <Box mt={5}>
                <FTextField
                  name="name"
                  label="Name"
                  defaultValue={defaultValues.name}
                />
              </Box>
              <Box mt={5}>
                <FTextField
                  name="title"
                  label="Title"
                  defaultValue={defaultValues.title}
                />
              </Box>
              <Box mt={5}>
                <FTextField
                  name="description"
                  label="Description"
                  defaultValue={defaultValues.description}
                />
              </Box>
              <Box mt={5}>
                <FTextField
                  name="website"
                  label="Website"
                  defaultValue={defaultValues.website}
                />
              </Box>
              <Box mt={5}>
                <Typography variant="subtitle2" mb={1}>
                  Click Add Team to add your team member
                </Typography>
                <FTextField
                  name="team"
                  label="Team"
                  defaultValue={defaultValues.team}
                />
                {teamMembers.map((member, index) => (
                  <Box key={index} display="flex" alignItems="center" mt={2}>
                    <FTextField
                      name="teamMember"
                      type="text"
                      value={member}
                      onChange={(e) =>
                        handleMemberChange(index, e.target.value)
                      }
                      placeholder={`Team Member ${index + 1}`}
                    />
                    <Button onClick={() => handleRemoveMember(index)}>
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button onClick={handleAddMember}>Add Team</Button>
              </Box>
              <Box mt={5}>
                <Typography variant="subtitle2" mb={1}>
                  Please record your project pitch video then upload it on your
                  youtube channel then paste the link here
                </Typography>
                <FTextField
                  name="video"
                  label="Video"
                  defaultValue={defaultValues.video}
                />
              </Box>
              <Box mt={5} mb={2}>
                <Typography variant="subtitle2" mb={1}>
                  How to get your Paypal clientId? Check out{" "}
                  <Link
                    href="https://www.upwork.com/resources/paypal-client-id-secret-key"
                    target="_blank"
                  >
                    here
                  </Link>{" "}
                  to get tutorial
                </Typography>
                <FTextField
                  name="clientID"
                  label="Your Paypal clientID"
                  defaultValue={defaultValues.clientID}
                />
              </Box>
            </Box>
            <LoadingButton
              mt={3}
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Save Change
            </LoadingButton>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}

export default EditModal;
