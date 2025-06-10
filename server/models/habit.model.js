import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  date: { type: String, required: true }, // e.g. "2025-06-09"
  habit: { type: String, required: true },
  status: { type: String, enum: ['done', 'missed'], required: true },
});

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
