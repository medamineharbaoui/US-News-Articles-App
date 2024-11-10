const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Load the dataset
const filePath = path.join(__dirname, "../data/News_Category_Dataset_v3.json");

// Load the city names from the unique_city_names.json file
const cityNamesPath = path.join(__dirname, "../data/unique_city_names.json");
const cityNames = JSON.parse(fs.readFileSync(cityNamesPath, "utf8")); // Load city names from JSON

// Create a read stream to handle large files line by line
const readStream = fs.createReadStream(filePath, "utf8");
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

// Initialize an array to hold the articles
const articles = [];

// Helper function to assign a city or "global" tag
function assignCity(article) {
  const headline = article.headline.toLowerCase();
  const description = article.short_description.toLowerCase();

  for (const city of cityNames) {
    if (
      headline.includes(city.toLowerCase()) ||
      description.includes(city.toLowerCase())
    ) {
      return city;
    }
  }
  return "global";
}

// Process each line of the file
rl.on("line", (line) => {
  try {
    const article = JSON.parse(line); // Parse the current line as a JSON object
    article.city = assignCity(article); // Assign city or "global" tag

    // Add the article to the array
    articles.push(article);
  } catch (error) {
    console.error("Error parsing line:", error);
  }
});

// Once all lines have been processed, write the updated dataset to a new file
rl.on("close", () => {
  // Write the updated dataset to a new JSON file
  const outputFilePath = path.join(__dirname, "../data/updated_dataset.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2));

  console.log(`Processed ${articles.length} articles.`);
  console.log("Updated dataset saved to updated_dataset.json");
});
