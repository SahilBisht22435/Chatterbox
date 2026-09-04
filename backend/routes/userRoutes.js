const express = require('express');
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for registering a user and getting all users
router.route("/")
    .post(registerUser) // User registration
    .get(protect, allUsers); // Protected route to get all users

// Route for user login
router.post("/login", authUser);

module.exports = router;
