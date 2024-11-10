const express = require("express");
const router = express.Router();
const {
  importArticlesFromJSON,
  getArticles,
  classifyAllArticles,
  getArticlesByLocation,
} = require("../controllers/ArticlesController");

// Route to import all articles to the database
router.post("/import", importArticlesFromJSON);

// Route to classify all articles
router.post("/classify", classifyAllArticles);

// Route to get all articles
router.get("/", getArticles);

// Route to get articles by location
router.get("/filtered", getArticlesByLocation);

module.exports = router;
