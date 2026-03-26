require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});