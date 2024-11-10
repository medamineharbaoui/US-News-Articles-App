const fs = require("fs");
const path = require("path");
const City = require("../models/City");

// Path to JSON file with city names
const jsonFilePath = path.join(__dirname, "../data/unique_city_names.json");

// Async function to read cities from JSON and save them to MongoDB
const importCitiesFromJSON = async (req, res) => {
  try {
    // Read and parse the JSON file
    const cityNamesArray = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

    // Convert city names to an array of City documents
    const cityDocs = cityNamesArray.map((cityName) => ({
      city_name: cityName,
      country: "US",
    }));

    // Insert city documents into MongoDB
    await City.insertMany(cityDocs);
    console.log("Cities successfully imported into the database.");

    // Send a success response
    res
      .status(201)
      .json({ message: "Cities successfully imported into the database." });
  } catch (error) {
    console.error("Error importing cities from JSON:", error);
    res.status(500).json({ error: "Error importing cities from JSON." });
  }
};

// Function to fetch all cities from the database
const getCities = async (req, res) => {
  try {
    const cities = await City.find(); // Fetch all cities from the database
    res.status(200).json(cities); // Return the list of cities as JSON
  } catch (error) {
    console.error("Error fetching cities data:", error);
    res.status(500).json({ error: "Error fetching cities data." });
  }
};

module.exports = { getCities, importCitiesFromJSON };
