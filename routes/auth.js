const verifyToken = require("../middleware/authMiddleware");
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

module.exports = router;
