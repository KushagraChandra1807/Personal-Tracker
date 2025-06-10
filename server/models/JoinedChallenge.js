import mongoose from 'mongoose';

const joinedChallengeSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  challenge: { type: String, required: true },
});

const JoinedChallenge = mongoose.model('JoinedChallenge', joinedChallengeSchema);

export default JoinedChallenge;
