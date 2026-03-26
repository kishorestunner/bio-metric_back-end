const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/verify", verifyUser);

module.exports = router;