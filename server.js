// Load env variables from an .env file (not created for now)
require("dotenv").config();

// Setup express
const express = require("express");
const app = express();

// Enable cross-origin resource sharing
const cors = require("cors");
app.use(cors());

// Import the axios library to use to make HTTP requests
const axios = require("axios");

// Get port number from env variables, or default of 5000
const PORT = process.env.PORT || 5000;

// API GET Route to fetch FPL Data
app.get("/players", async (req, res) => {
    try {
        const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
        res.json(response.data.elements); // Send player data
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));