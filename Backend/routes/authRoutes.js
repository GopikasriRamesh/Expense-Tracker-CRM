const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
console.log('✅ Middleware loaded'); // ✅ correct import

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Protected route to get user info
router.get('/user', protect, getUserInfo);

router.post("/upload-image",upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ message: 'File uploaded successfully', imageUrl });
});

module.exports = router;
