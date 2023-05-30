import { Box } from "@mui/material";
import React, { useState } from "react";
import { FSelect } from './form';

function FilterBtn({ handleFilter }) {
  const [status, setStatus] = useState("all");
  
  handleFilter(status)
  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  }

  return (
      <Box sx={{ minWidth: 120}}>
      <FSelect name="filter" label="Filter By" size="small" sx={{ width: 300 }} onChange={handleChange}>
        {[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" }
        ].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
    </Box>
  );
}

export default FilterBtn;
