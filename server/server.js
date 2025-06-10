import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import habitRoutes from './routes/habit.routes.js'; // ✅ Add Habit Routes
import JoinedChallenge from './models/JoinedChallenge.js'; // ✅ For direct route usage

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ ROUTES
app.use('/api/users', userRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api', challengeRoutes);
app.use('/api/habits', habitRoutes); // 🧠 Habit tracking endpoints

// ✅ Joined Challenges route (keep this if not part of challengeRoutes)
app.get('/api/challenges/joined/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const challenges = await JoinedChallenge.find({ clerkId });
    res.json({ data: challenges });
  } catch (err) {
    console.error('❌ Error fetching joined challenges:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
