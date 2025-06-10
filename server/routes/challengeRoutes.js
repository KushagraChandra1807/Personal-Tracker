import express from 'express';
import JoinedChallenge from '../models/JoinedChallenge.js';

const router = express.Router();

// Join challenge
router.post('/join-challenge', async (req, res) => {
  try {
    const { clerkId, challenge } = req.body;
    if (!clerkId || !challenge) return res.status(400).json({ error: 'Missing required fields' });

    const existing = await JoinedChallenge.findOne({ clerkId, challenge });
    if (existing) return res.status(200).json({ message: 'Already joined', challenge: existing });

    const joined = await JoinedChallenge.create({ clerkId, challenge });
    res.status(201).json({ message: 'Challenge joined', challenge: joined });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all challenges joined by a user
router.get('/joined-challenges/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const challenges = await JoinedChallenge.find({ clerkId });
    res.status(200).json({ challenges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
