import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Filter = ({ filterType, onFilterChange }) => {
  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      <FormLabel component="legend">Filter by Type</FormLabel>
      <RadioGroup
        row
        aria-label="filter"
        name="filterType"
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="local" control={<Radio />} label="Local" />
        <FormControlLabel value="global" control={<Radio />} label="Global" />
      </RadioGroup>
    </FormControl>
  );
};

export default Filter;
