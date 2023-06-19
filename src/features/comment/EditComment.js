import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  alpha,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateComment } from "./commentSlice";

const updateSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

function EditComment({ comment, openEditDialog, editDialogClose, projectId }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comment.isLoading);

  const defaultValues = {
    content: comment?.content,
    image: comment?.image,
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
    dispatch(updateComment({ projectId, id: comment._id, ...data }));
    editDialogClose();
  };

  return (
    <Dialog open={openEditDialog} onClose={editDialogClose}>
      <DialogTitle color="primary" textAlign="center">
        Edit your comment <Divider />{" "}
      </DialogTitle>
      <DialogContent>
        <Box minWidth={350} maxHeight={350} mt={1}>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <FTextField
                name="content"
                multiline
                fullWidth
                onChange={(e) => setValue("content", e.target.value)}
                rows={2}
                placeholder="Post a new question or comment"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <Box textAlign="center">
                <img src={defaultValues.image} alt="" />
              </Box>
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
                  color="primary"
                  loading={isSubmitting || isLoading}
                >
                  Save Change
                </LoadingButton>
              </Box>
            </FormProvider>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditComment;
