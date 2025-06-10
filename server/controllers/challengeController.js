const ChallengeUser = require('../models/ChallengeUser');

exports.joinChallenge = async (req, res) => {
  try {
    const { userId, name, challenge } = req.body;

    if (!userId || !challenge) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await ChallengeUser.findOne({ userId, challenge });

    if (existing) {
      return res.status(200).json({ message: 'Already joined', challenge: existing });
    }

    const newChallenge = await ChallengeUser.create({
      userId,
      name,
      challenge,
    });

    res.status(201).json({ message: 'Challenge joined!', challenge: newChallenge });
  } catch (error) {
    console.error('❌ Error saving challenge:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
