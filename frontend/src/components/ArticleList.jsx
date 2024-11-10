import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Grid2,
  Pagination,
} from "@mui/material";

const ArticleList = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const articlesPerPage = 9; // Number of articles per page

  // Calculate the index of the first and last articles on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  // Slice the articles based on the current page
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#5a5a89" }}>
      <Pagination
        count={Math.ceil(articles.length / articlesPerPage)} // Total pages
        page={currentPage} // Current page
        onChange={handlePageChange} // Handle page change
        color="primary"
        sx={{
          marginTop: 1,
          marginBottom: 1,
          display: "flex",
          justifyContent: "center",
        }}
      />
      {articles.length > 0 ? (
        <>
          <Grid2 container spacing={2}>
            {currentArticles.map((article) => (
              <Grid2 item xs={12} sm={6} md={4} key={article._id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      <Link
                        href={article.content}
                        target="_blank"
                        variant="body2"
                        color="primary"
                      >
                        {article.title}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {article.authors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {article.publication_date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Location:</strong> {article.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          {/* Pagination controls */}
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No articles found.
        </Typography>
      )}
    </Box>
  );
};

export default ArticleList;
