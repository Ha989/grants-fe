import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProjects } from "./projectSlice";
import { Box, Container, Stack, Typography } from "@mui/material";
import { FormProvider } from "../../components/form";
import SearchInput from "../../components/SearchInput";
import SortProject from "../../components/SortProject";
import { useForm } from "react-hook-form";

// import LoadingScreen from '../../components/LoadingScreen';

function ProjectList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleOnSubmit = (search) => {
    setSearch(search);
  };
  console.log("ser", search);

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };
  console.log("sort", sortBy);
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (formData) => {
    setSortBy(formData.sortBy);
  };

  useEffect(() => {
    dispatch(
      getProjects({
        page,
        limit,
        search,
        sortBy,
      }));
  }, [dispatch, page, limit, search, sortBy]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        mt: 3,
      }}
      padding="1"
    >
      <Typography
        color="primary"
        textAlign="center"
        variant="h4"
        mt="10px"
        mb="20px"
      >
        Projects List
      </Typography>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      > 
      <Box marginBottom={5}>
        <SearchInput handleOnSubmit={handleOnSubmit} />
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box  marginBottom={5}>
          <SortProject handleSortChange={handleSortChange} mt={2} />
          </Box>
        </FormProvider>
      </Stack>
      <Box></Box>
    </Container>
  );
}

export default ProjectList;
