const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

const app = express();

// Upload folder
const upload = multer({ dest: "uploads/" });

// Static files serve
app.use(express.static(__dirname));

// Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.send("No image uploaded");
    }

    const formData = new FormData();
    formData.append("media", fs.createReadStream(req.file.path));
    formData.append("models", "genai");
    formData.append("api_user", "1330210061");
    formData.append("api_secret", "nGNcKHS5hYb3ckzMPZMHEQDGH6CVZobu");

    const response = await axios.post(
      "https://api.sightengine.com/1.0/check.json",
      formData,
      { headers: formData.getHeaders() }
    );

    const result = response.data;
    const percentage = (result.type.ai_generated * 100).toFixed(2);

    // uploaded file delete kar do
    fs.unlinkSync(req.file.path);

    res.send("AI Probability: " + percentage + "%");

  } catch (error) {
    console.error(error);
    res.send("Error analyzing image");
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
