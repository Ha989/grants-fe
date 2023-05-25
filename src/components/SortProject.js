import { Box, FormControl, InputLabel, Select } from "@mui/material";
import React, { useState } from "react";
import { FSelect, FormProvider } from "./form";
import { sortBy } from "lodash";
import { useForm } from "react-hook-form";

function SortProject({ handleSortChange }) {
  const [sortBy, setSortBy] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSortBy(event.target.value);
  };
  
  handleSortChange(sortBy);

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      <FSelect name="sortBy" label="Sort By" size="small" sx={{ width: 300 }} onChange={handleChange}>
        {[
          { value: "popular", label: "Popular" },
          { value: "newest", label: "Newest" },
          { value: "highestRaised", label: "Raised: High-Low" },
          { value: "lowestRaised", label: "Raised: Low-High" },
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
      {/* </FormProvider> */}
    </Box>
  );
}

export default SortProject;
