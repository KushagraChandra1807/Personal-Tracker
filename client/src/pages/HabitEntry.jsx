import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "../lib/axios";

const HabitEntry = () => {
  const { user } = useUser();
  const [habit, setHabit] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("done");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await axios.post("/api/habits/track", {
        clerkId: user.id,
        habit,
        date,
        status,
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error("Error saving habit:", err);
      setMessage("Error saving habit.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">📝 Track a Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="Enter Habit (e.g., Morning Walk)"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="done">✅ Done</option>
          <option value="missed">❌ Missed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
        >
          Save Habit
        </button>
        {message && <p className="text-center mt-2 text-green-700">{message}</p>}
      </form>
    </div>
  );
};

export default HabitEntry;
