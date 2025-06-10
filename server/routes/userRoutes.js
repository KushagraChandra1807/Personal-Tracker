import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/clerk-user', async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;
    if (!clerkId || !email || !name) return res.status(400).json({ error: 'Missing required fields' });

    let user = await User.findOne({ clerkId });
    if (user) return res.status(200).json({ message: 'User already exists', user });

    user = await User.create({ clerkId, email, name });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
