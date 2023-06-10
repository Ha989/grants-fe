import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FTextField, FormProvider } from "../../components/form";
import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { fData } from "../../utils/numberFormat";
import FUpLoadAvatar from "../../components/form/FUpLoadAvatar";
import { LoadingButton } from "@mui/lab";
import { updateCreatorProfile } from "./creatorSlice";

const UpdateCreatorSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function CreatorSetting() {
  const auth = useAuth();
  const creator = auth?.creator;
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const defaultValues = {
    name: creator?.name || "",
    avatarUrl: creator?.avatarUrl || "",
    bio: creator?.bio || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateCreatorSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateCreatorProfile({ creatorId: creator._id, ...data }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <Container>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box width={{ xs: "90vw", md: "60vw" }}>
        <Card sx={{ py: 10, px: 3, textAlign: "center" }} width={300}>
          <FUpLoadAvatar
            name="avatarUrl"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
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
        </Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <FTextField name="name" label="Your Name" />
          <FTextField name="bio" multiline rows={4} label="Your Bio" />
        </Stack>
        <Box mt={3} textAlign="center">
          <LoadingButton
            mt={3}
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
    </Container>
  );
}

export default CreatorSetting;
