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
const dropArea = document.getElementById("dropArea");
const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");

// Click to open file
dropArea.addEventListener("click", () => input.click());

// Drag events
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragging");

  const file = e.dataTransfer.files[0];
  input.files = e.dataTransfer.files;

  preview.style.display = "block";
  preview.src = URL.createObjectURL(file);
});

// Preview when selecting normally
input.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);
  }
});
const resultLabel = document.getElementById("resultLabel");
const confidenceText = document.getElementById("confidenceText");
