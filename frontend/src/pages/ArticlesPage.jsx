import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { Container, Box, Typography, Paper } from "@mui/material";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term entered in search bar
  const [filterType, setFilterType] = useState("all"); // Filter type: 'all', 'local', or 'global'

  // Memoized fetchArticles function using useCallback
  const fetchArticles = useCallback(async () => {
    try {
      // Build the query string based on filter and search term
      let query = `?filterType=${filterType}`;

      if (searchTerm) query += `&location=${searchTerm}`; // Add search term as 'location' parameter

      // Send the request with the query parameters
      const response = await axios.get(
        `http://localhost:5000/articles/filtered${query}`
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }, [filterType, searchTerm]); // Only change when filterType or searchTerm changes

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles(); // Fetch articles when search is submitted
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]); // Re-fetch when fetchArticles changes

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          News Articles
        </Typography>
      </Box>

      {/* Search Bar and Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 4,
          flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
        }}
      >
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <Filter filterType={filterType} onFilterChange={handleFilterChange} />
      </Box>

      {/* Article List */}
      <Paper sx={{ padding: 2, backgroundColor: "#5a5a89" }}>
        <ArticleList articles={articles} />
      </Paper>
    </Container>
  );
};

export default ArticlesPage;
