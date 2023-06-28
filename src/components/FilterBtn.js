import { Box } from "@mui/material";
import React from "react";
import { FSelect } from './form';

function FilterBtn({ handleFilter }) { 

  return (
      <Box sx={{ minWidth: 120}}>
      <FSelect name="filter" label="Filter By" size="small" sx={{ width: 300 }} onChange={(event) => handleFilter(event.target.valie)}>
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
