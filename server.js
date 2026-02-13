const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(__dirname));

app.post("/upload", upload.single("image"), async (req, res) => {
  try {

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

    res.send("AI Probability: " + (result.type.ai_generated * 100).toFixed(2) + "%");

  } catch (error) {
    res.send("Error analyzing image");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

