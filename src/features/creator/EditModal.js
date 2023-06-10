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
import Joi from "joi";
import * as yup from "yup";


// const CreateProjectSchema = Joi.object({
//     name: Joi.string().required().messages({
//       'any.required': 'Name is required',
//     }),
//     title: Joi.string().required().max(100).messages({
//       'any.required': 'Title is required',
//       'string.max': 'Title must be less than 100 characters',
//     }),
//     description: Joi.string().required().messages({
//       'any.required': 'Description is required',
//     }),
//     website: Joi.string().uri().required().messages({
//       'any.required': 'Website is required',
//       'string.uri': 'Website must be a valid URL',
//     }),
//     logo: Joi.object()
//       .required()
//       .custom((value, helpers) => {
//         if (value && value instanceof File) {
//           return value;
//         }
//         return helpers.error('any.invalid');
//       })
//       .messages({
//         'any.required': 'Logo is required',
//         'any.invalid': 'Invalid file format',
//       }),
//     banner: Joi.object()
//       .required()
//       .custom((value, helpers) => {
//         if (value && value instanceof File) {
//           return value;
//         }
//         return helpers.error('any.invalid');
//       })
//       .messages({
//         'any.required': 'Banner is required',
//         'any.invalid': 'Invalid file format',
//       }),
//     video: Joi.string().uri().required().messages({
//       'any.required': 'Pitch video is required',
//       'string.uri': 'Video must be a valid video link',
//     }),
//     bankDetail: Joi.string().required().messages({
//       'any.required': 'Bank Detail is required',
//     }),
//   });
  

const updateSchema =  yup.object().shape({
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
    bankDetail: project?.bankDetail,
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

  const onSubmit = (data) => {
    dispatch(updateProject({ projectId: project._id, ...data }));
    console.log("data",data)
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle color="primary" textAlign="center">
            EDIT YOUR PROJECT
            <Divider />
          </DialogTitle>
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
                    onDrop={(acceptedFiles) =>
                      handleDrop(acceptedFiles, "logo")
                    }
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
                  <FTextField name="name" label="Name" defaultValue={defaultValues.name}/>
                </Box>
                <Box mt={5}>
                  <FTextField name="title" label="Title" defaultValue={defaultValues.title}/>
                </Box>
                <Box mt={5}>
                  <FTextField name="description" label="Description" defaultValue={defaultValues.description}/>
                </Box>
                <Box mt={5}>
                  <FTextField name="website" label="Website" defaultValue={defaultValues.website}/>
                </Box>
                <Box mt={5}>
                  <FTextField name="team" label="Team" defaultValue={defaultValues.team}/>
                  <Button>Add More</Button>
                </Box>
                <Box mt={5}>
                  <Typography variant="subtitle2" mb={1}>
                    Please record your project pitch video then upload it on
                    your youtube channel then paste the link here
                  </Typography>
                  <FTextField name="video" label="Video" defaultValue={defaultValues.video}/>
                </Box>
                <Box mt={5} mb={2}>
                  <FTextField name="bankDetail" label="Bank Detail" defaultValue={defaultValues.bankDetail}/>
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
  )
};

export default EditModal;
