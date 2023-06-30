import React, { useEffect, useState } from "react";
import { getDonationsOfUser } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import FilterBtn from "../../components/FilterBtn";


function UserDonations() {
  const dispatch = useDispatch();
  const donations = useSelector((state) => state.user.donation);
  const totalPage = useSelector((state) => state.user.totalPage);
  const [page, setPage] = useState("1");
  const [status, setStatus] = useState("all");

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleFilter = (statusValue) => {
    setStatus(statusValue);
  };
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (formData) => {
    setStatus(formData.status);
  };

  useEffect(() => {
    dispatch(
      getDonationsOfUser({
        page,
        status,
      })
    );
  }, [dispatch, page, status]);
 
  const extractDate = (response) => {
    const date = new Date(response);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  };


  return (
    <Container> 
      <Stack padding={1}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FilterBtn handleFilter={handleFilter} />
        </FormProvider>
      </Stack>
      <Stack width={{ xs: "100vw", md: "60vw"}} padding={1} height="55vh">
        <Stack
          padding={1}
          direction="row"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h6" fontFamily="Arial" color="primary">
            PROJECT
          </Typography>
          <Typography variant="h6" fontFamily="Arial" color="primary">
            AMOUNT
          </Typography>
          <Typography variant="h6" fontFamily="Arial" color="primary">
            DATE
          </Typography>
        </Stack>
        <Divider />
        {donations?.map((donation) => {
          return (
            <>
              <Stack
                padding={1}
                direction="row"
                justifyContent="space-between"
                mb={1}
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" key={donation?._id}>
                  <img
                    width={40}
                    height={40}
                    src={donation?.projectId.logo}
                    alt={donation?.projectId.name}
                  />
                  <Typography variant="h7" >
                    {donation?.projectId.name}
                  </Typography>
                </Stack>
                <Typography variant="h7" fontFamily="Arial" color="primary" >
                  $ {donation?.amount}
                </Typography>
                <Typography variant="h7" fontFamily="Arial" color="primary" >
                  {extractDate(donation?.createdAt)}
                </Typography>
              </Stack>
              <Divider />
            </>
          );
        })}
      </Stack>
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
}

export default UserDonations;
