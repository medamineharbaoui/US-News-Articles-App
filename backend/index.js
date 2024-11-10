const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // For loading environment variables

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    /*
    // Get the database
    const db = mongoose.connection.db;

    // List all collections
    const collections = await db.listCollections().toArray();

    // Drop each collection
    for (let collection of collections) {
      await db.collection(collection.name).drop();
      console.log(`Dropped collection: ${collection.name}`);
    }

*/
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Import the routes
const cityRoutes = require("./routes/cities");
const articleRoutes = require("./routes/articles");

// Use the routes with appropriate prefixes
app.use("/cities", cityRoutes);
app.use("/articles", articleRoutes);

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("Welcome to the Local News App!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Download uscities.csv dataset
// Run the first script :  exctract.js , to create a json file (unique_city_names.json) containing a list of all us cities
// Run the second script : assignCity.js , this will create a dataset(updated_dataset.sjon) of articles with a city name if the article header or description contains a city name from the list, or "global" if there is no city name in the article
// Run the third script : analyse.js , to know how many article we have in the dataset, how many are "global", and the percentage of these "global" article
// Run the fourth script : balance.js, this will create a balanced dataset (balanced_dataset.json) of articles, in which 20% are "global"

/*system is designed to process news articles, classify them as either "local" or "global," determine their location, and store the results in both a classified JSON file and a MongoDB database.*/
