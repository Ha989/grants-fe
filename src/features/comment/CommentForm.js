import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createComment } from "./commentSlice";
import { Box, Stack, TextField, alpha } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import FUpLoadImage from "../../components/form/FUpLoadImage";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};
function CommentForm({ projectId }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment.isLoading);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = ({ data }) => {
    dispatch(createComment({ projectId, ...data })).then(() => reset());
    console.log("check");
  };
  console.log("d", projectId);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box border="1px solid green" maxHeight={300}>
        <Stack spacing={2}>
          <FUpLoadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={2}
            placeholder="Post a new question or comment"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default CommentForm;
