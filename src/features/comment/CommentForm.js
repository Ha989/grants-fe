import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createComment } from "./commentSlice";
import { Box, Stack, alpha } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import FUpLoadImage from "../../components/form/FUpLoadImage";
import { LoadingButton } from "@mui/lab";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};
function CommentForm({ projectId, parentId, onClose }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment.isLoading);
  console.log("pd", projectId);
  console.log("pa", parentId);

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

  const onSubmit = async (data) => {
    console.log("p", data);
    dispatch(createComment({ projectId, parentId, ...data }));
    reset();
    console.log("check");
  };

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
    <Box border="1px solid green" maxHeight={350} mt={5}>
      <Stack spacing={2}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
            mt={2}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </FormProvider>
      </Stack>
    </Box>
  );
}

export default CommentForm;
