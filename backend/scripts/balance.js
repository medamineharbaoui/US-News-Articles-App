const fs = require("fs");
const path = require("path");

// File paths
const inputFilePath = path.join(__dirname, "../data/updated_dataset.json");
const outputFilePath = path.join(__dirname, "../data/balanced_dataset.json");

// Load the updated dataset
const dataset = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

// Count global and non-global articles
const globalArticles = dataset.filter((article) => article.city === "global");
const nonGlobalArticles = dataset.filter(
  (article) => article.city !== "global"
);

// Ensure we select 20 global articles and 80 non-global articles
const targetGlobalCount = 20; // 40 global articles
const targetNonGlobalCount = 80; // 160 non-global articles

// Ensure we don't exceed the available number of global and non-global articles
const finalGlobalCount = Math.min(targetGlobalCount, globalArticles.length);
const finalNonGlobalCount = Math.min(
  targetNonGlobalCount,
  nonGlobalArticles.length
);

// Randomly shuffle and select the required number of global articles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Shuffle global and non-global articles and select the required number
shuffle(globalArticles);
shuffle(nonGlobalArticles);

const selectedGlobalArticles = globalArticles.slice(0, finalGlobalCount);
const selectedNonGlobalArticles = nonGlobalArticles.slice(
  0,
  finalNonGlobalCount
);

// Combine selected global and non-global articles
const balancedDataset = [
  ...selectedGlobalArticles,
  ...selectedNonGlobalArticles,
];

// Shuffle the final dataset for randomness
shuffle(balancedDataset);

// Save the balanced dataset to a new JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(balancedDataset, null, 2));

console.log(
  `Balanced dataset created. Total articles: ${balancedDataset.length}`
);
console.log(`Articles with city = "global": ${finalGlobalCount}`);
console.log(`Articles with city != "global": ${finalNonGlobalCount}`);
console.log(
  `Percentage of global articles: ${
    (finalGlobalCount / balancedDataset.length) * 100
  }%`
);
