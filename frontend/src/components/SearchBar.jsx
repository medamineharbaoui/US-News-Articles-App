import React from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Styles for the SearchBar
const searchBarStyles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  input: {
    backgroundColor: "#fff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  },
};

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <Box component="form" onSubmit={onSearchSubmit} sx={searchBarStyles.form}>
      {/* TextField for Search Input */}
      <TextField
        label="Search by keyword or location"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={searchBarStyles.input}
      />

      {/* Search Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={searchBarStyles.button}
      >
        <SearchIcon sx={{ marginRight: 1 }} />
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
