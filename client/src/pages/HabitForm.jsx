import React, { useState } from "react";

const habitsList = [
  { id: 1, name: "Drink 8 glasses of water" },
  { id: 2, name: "Exercise for 30 minutes" },
  { id: 3, name: "Sleep 7+ hours" },
  { id: 4, name: "Read for 20 minutes" },
  { id: 5, name: "Meditate or practice mindfulness" },
];

const HabitForm = () => {
  const [habits, setHabits] = useState(
    habitsList.map((habit) => ({ ...habit, done: false }))
  );
  const [score, setScore] = useState(null);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalDone = habits.filter((habit) => habit.done).length;
    setScore(totalDone);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl p-8 bg-gradient-to-br from-indigo-50 to-white rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
          Track Your Daily Habits
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <label
                key={habit.id}
                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-shadow
                  ${habit.done ? "bg-indigo-600 text-white shadow-lg" : "bg-white hover:shadow-lg"}
                `}
              >
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() => toggleHabit(habit.id)}
                  className="hidden"
                />
                <span
                  className={`w-6 h-6 inline-block mr-4 rounded border-2 border-indigo-600 flex-shrink-0
                    ${habit.done ? "bg-white" : "bg-transparent"}
                  `}
                >
                  {habit.done && (
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-lg font-medium select-none">{habit.name}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold
            shadow-md transform transition-transform hover:scale-105 duration-200"
          >
            Calculate Score
          </button>
        </form>

        {score !== null && (
          <div
            className="mt-8 text-center text-indigo-700 font-extrabold text-2xl animate-pulse"
            aria-live="polite"
          >
            Your Habit Score:{" "}
            <span className="text-indigo-900">{score} / {habits.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitForm;
