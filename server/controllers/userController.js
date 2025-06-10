const User = require('../models/User');

exports.saveClerkUser = async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    const user = new User({ clerkId, email, name });
    await user.save();

    res.status(201).json({ message: 'User saved!', user });
  } catch (error) {
    console.error('Error saving Clerk user:', error);
    res.status(500).json({ error: 'Error saving user.' });
  }
};
