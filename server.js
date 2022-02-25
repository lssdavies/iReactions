// Importing server dependencies
const express = require("express");
const mongoose = require("mongoose");

const router = express().Router();
const PORT = process.env.PORT || 3001;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/pizza-hunt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

router.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
