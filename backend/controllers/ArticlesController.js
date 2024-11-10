const fs = require("fs");
const path = require("path");
const Article = require("../models/Article");
const { classifyWithOpenAI } = require("../scripts/dataPipeline");

// Function to split the data into chunks of two articles each
const splitDataIntoChunks = (articles) => {
  const chunks = [];
  for (let i = 0; i < articles.length; i += 2) {
    chunks.push(articles.slice(i, i + 2)); // Slice every 2 articles into a chunk
  }
  return chunks;
};

// Async function to classify all articles and store the results in a new JSON file
const classifyAllArticles = async (req, res) => {
  try {
    const jsonFilePath = path.join(__dirname, "../data/balanced_dataset.json");
    const articlesData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    const classifiedArticles = [];

    // Split articles into chunks of 2 articles each
    const articleChunks = splitDataIntoChunks(articlesData);

    // Loop through each chunk and classify them
    for (const chunk of articleChunks) {
      const classificationPromises = chunk.map(async (article) => {
        // Use OpenAI to classify the article
        const { isGlobal, location } = await classifyWithOpenAI(article);

        // Format the date to "YYYY-MM-DD"
        const formattedDate = new Date(article.date)
          .toISOString()
          .split("T")[0]; // Extract date part only

        // Create the classified article object
        return {
          title: article.headline,
          category: article.category,
          description: article.short_description,
          authors: article.authors,
          content: article.link,
          publication_date: formattedDate, // Use formatted date
          location: location,
          isGlobal: isGlobal,
        };
      });

      // Wait for all the classifications in the chunk to complete
      const classifiedChunk = await Promise.all(classificationPromises);

      // Push the classified articles to the final array
      classifiedArticles.push(...classifiedChunk);
    }

    // Path to the JSON file where the classified articles will be stored
    const classifiedFilePath = path.join(
      __dirname,
      "../data/classified_articles.json"
    );

    // Write the classified articles to the JSON file
    fs.writeFileSync(
      classifiedFilePath,
      JSON.stringify(classifiedArticles, null, 2),
      "utf-8"
    );

    // Send the count of classified articles in the response
    res.status(200).json({
      message: "Articles classified successfully.",
      classifiedArticlesCount: classifiedArticles.length,
    });
  } catch (error) {
    console.error("Error classifying articles:", error);
    res.status(500).json({ error: "Error classifying the articles" });
  }
};

// Function to import articles from the classified JSON file into MongoDB
const importArticlesFromJSON = async (req, res) => {
  try {
    const jsonFilePath = path.join(
      __dirname,
      "../data/classified_articles.json"
    );

    // Read and parse the JSON file containing the articles
    const articlesArray = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

    // Convert articles data to an array of Article documents
    const articleDocs = articlesArray.map((article) => ({
      title: article.title,
      category: article.category,
      description: article.description,
      authors: article.authors,
      content: article.content,
      publication_date: article.publication_date,
      location: article.location,
      isGlobal: article.isGlobal,
    }));

    // Insert article documents into MongoDB
    await Article.insertMany(articleDocs);

    // Send success response
    res.status(201).json({
      message: "Articles successfully imported into the database.",
      importedArticlesCount: articleDocs.length,
    });
  } catch (error) {
    console.error("Error importing articles from JSON:", error);
    res.status(500).json({ error: "Error importing articles from JSON." });
  }
};

// Async function to get articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles data:", error);
    res.status(500).json({ error: "Error fetching articles data." });
  }
};

// Async function to get articles by location
const getArticlesByLocation = async (req, res) => {
  try {
    const { location } = req.query; // Get the search term from query params
    const { filterType } = req.query; // Get the filter type (local, global, or all) from query params

    // Build the query object based on filterType
    let query = {};

    // Apply filter based on isGlobal
    if (filterType === "local") {
      query.isGlobal = false;
    } else if (filterType === "global") {
      query.isGlobal = true;
    }

    // Apply search filter based on location, description, or headline if location is provided
    if (location) {
      query.$or = [
        { location: { $regex: new RegExp(location, "i") } },
        { description: { $regex: new RegExp(location, "i") } },
        { headline: { $regex: new RegExp(location, "i") } },
      ];
    }

    const articles = await Article.find(query);
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles data:", error);
    res.status(500).json({ error: "Error fetching articles data." });
  }
};

module.exports = {
  importArticlesFromJSON,
  getArticles,
  classifyAllArticles,
  getArticlesByLocation,
};
