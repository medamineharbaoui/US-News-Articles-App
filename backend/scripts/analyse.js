const fs = require("fs");
const path = require("path");

// Path to the updated dataset
const filePath = path.join(__dirname, "../data/updated_dataset.json");

// Read the dataset
const dataset = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Initialize counters
let totalArticles = dataset.length;
let globalArticles = dataset.filter(
  (article) => article.city === "global"
).length;

// Calculate the percentage of global articles
let globalPercentage = (globalArticles / totalArticles) * 100;

// Output the results
console.log(`Total number of articles: ${totalArticles}`);
console.log(`Number of articles with city = "global": ${globalArticles}`);
console.log(`Percentage of global articles: ${globalPercentage.toFixed(2)}%`);
