const express = require("express");
const router = express.Router();
const {
  getCities,
  importCitiesFromJSON,
} = require("../controllers/CityController");

// Route to import cities from CSV
router.post("/import", importCitiesFromJSON);

// Route to get all cities
router.get("/", getCities);

module.exports = router;
