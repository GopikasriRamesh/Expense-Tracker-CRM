const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profilePicUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the user
    const user = new User({
      fullName,
      email,
      password,
      profilePicUrl,
    });

    await user.save(); // Save to DB (triggers pre-save hash)

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicUrl: user.profilePicUrl,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;   

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // ✅ Select password explicitly
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicUrl: user.profilePicUrl,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error in login', error: error.message });
  }
};

// Get User Info (requires middleware to attach user to req)
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};
