import express from 'express';
import Habit from '../models/habit.model.js';

const router = express.Router();

// 📊 Get habit summary for a user
router.get('/summary/:clerkId', async (req, res) => {
  const { clerkId } = req.params;

  try {
    const habits = await Habit.find({ clerkId });

    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Sunday of current week

    let weeklyCount = 0;
    let topHabitMap = {};
    let currentStreak = 0;

    // Sort by date descending
    const sorted = [...habits].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Count weekly completions and top habit
    for (const entry of habits) {
      const entryDate = new Date(entry.date);

      if (entry.status === 'done' && entryDate >= currentWeekStart) {
        weeklyCount++;
        topHabitMap[entry.habit] = (topHabitMap[entry.habit] || 0) + 1;
      }
    }

    // Calculate current streak
    let streakDate = new Date(today);
    while (true) {
      const dateStr = streakDate.toISOString().split("T")[0];
      const match = habits.find(
        (h) => h.date === dateStr && h.status === 'done'
      );
      if (match) {
        currentStreak++;
        streakDate.setDate(streakDate.getDate() - 1); // Go back one day
      } else {
        break;
      }
    }

    const topHabit = Object.entries(topHabitMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    res.json({
      streak: currentStreak,
      weeklyCount,
      topHabit,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Save or update a habit for a day
router.post('/track', async (req, res) => {
  const { clerkId, habit, date, status } = req.body;

  try {
    const existing = await Habit.findOne({ clerkId, habit, date });
    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: 'Habit updated' });
    }

    await Habit.create({ clerkId, habit, date, status });
    res.status(201).json({ message: 'Habit saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all habits for a user
router.get('/:clerkId', async (req, res) => {
  try {
    const habits = await Habit.find({ clerkId: req.params.clerkId });
    res.json({ habits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
