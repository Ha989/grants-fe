import React, { useEffect, useState } from "react";
import { getDonationsOfUser } from "./userSlice";
// import { Container, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import FilterBtn from "../../components/FilterBtn";

// import FilterBtn from "../../components/FilterBtn";
// import { FormProvider } from "../../components/form";
// import { useForm } from "react-hook-form";
// import Pagination from "../../components/Pagination";

function UserDonations({ user }) {
  const dispatch = useDispatch();
  const donations = useSelector((state) => state.user.donation);
  console.log("donation", donations)
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState(10);
  // const [totalPage, setTotalPage] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = (statusValue) => {
    setStatus(statusValue);
  };
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (formData) => {
    setStatus(formData.status);
  };

  useEffect(() => {
    dispatch(getDonationsOfUser({
      page, limit, status
    }));
  }, [dispatch, page, limit, status]);
  return (
    <Container>
      <Stack border="1px solid green" padding={1}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FilterBtn handleFilter={handleFilter} />
        </FormProvider>
      </Stack>
      <Stack border="1px solid green" width="90vw" padding={1}>
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
                key={donation?._id}
                mb={1}
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <img
                    width={40}
                    height={40}
                    src={donation?.projectId.logo}
                    alt={donation?.projectId.name}
                  />
                  <Typography variant="h7">
                    {donation?.projectId.name}
                  </Typography>
                </Stack>
                <Typography variant="h7" fontFamily="Arial" color="primary">
                  $ {donation?.amount}
                </Typography>
                <Typography variant="h7" fontFamily="Arial" color="primary">
                  {donation?.createAt}
                </Typography>
              </Stack>
              <Divider />
            </>
          );
        })}
      </Stack>
    </Container>
  )};

  export default UserDonations;
  
