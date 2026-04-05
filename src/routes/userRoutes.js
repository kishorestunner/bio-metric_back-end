const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/get-user", getUser);

module.exports = router;