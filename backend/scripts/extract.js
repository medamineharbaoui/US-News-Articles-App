const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "../data/uscities.csv");
const outputFilePath = path.join(__dirname, "../data/unique_city_names.json");

const importCitiesFromCSV = async () => {
  const cityNames = new Set(); // Use a Set to store unique city names

  // Read and parse the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // Add each city name to the Set (only unique names will be added)
      cityNames.add(row.city);
    })
    .on("end", () => {
      // Convert the Set to an array for easier handling and save it to a JSON file
      const cityNamesArray = Array.from(cityNames);

      fs.writeFileSync(outputFilePath, JSON.stringify(cityNamesArray, null, 2));
      console.log(
        "Unique city names extracted and saved to unique_city_names.json"
      );
    })
    .on("error", (error) => {
      console.error("Error importing cities from CSV:", error);
    });
};

// Run the function
importCitiesFromCSV();
