import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "../lib/axios";
import { CheckCircle } from "lucide-react";

const Home = () => {
  const { user } = useUser();
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [showHabitSummary, setShowHabitSummary] = useState(false);
  const [habitSummary, setHabitSummary] = useState(null);

  useEffect(() => {
    const saveUserAndFetchChallenges = async () => {
      if (!user) return;

      try {
        await axios.post("/api/users/clerk-user", {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: `${user.firstName} ${user.lastName}`,
        });

        const res = await axios.get(`/api/challenges/joined/${user.id}`);
        const normalized = res.data.data.map((item) => item.challenge);
        setJoinedChallenges(normalized);
      } catch (error) {
        console.error("❌ Error in Home useEffect:", error);
      }
    };

    saveUserAndFetchChallenges();
  }, [user]);

  const fetchHabitSummary = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/habits/summary/${user.id}`);
      setHabitSummary(res.data);
    } catch (error) {
      console.error("❌ Error fetching habit summary:", error);
    }
  };

  const handleHabitCardClick = () => {
    setShowHabitSummary(!showHabitSummary);
    if (!habitSummary) fetchHabitSummary(); // fetch only once
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to Your App
      </h1>

      {/* 📦 Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/habit-form"
          className="bg-white shadow-lg p-6 rounded-2xl border hover:shadow-xl transition-shadow block"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Calculate Daily Habit Score
          </h2>
          <p>Fill your habit details here.</p>
        </Link>

        {/* Habit Tracker Summary Toggle */}
        <div
          onClick={handleHabitCardClick}
          className="cursor-pointer bg-white shadow-lg p-6 rounded-2xl border hover:shadow-xl transition-shadow block"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Habit Tracker
          </h2>
          <p>Track your habits over time.</p>
        </div>

        <Link
          to="/joined-challenges"
          className="bg-white shadow-lg p-6 rounded-2xl border hover:shadow-xl transition-shadow block"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Joined Challenges
          </h2>
          <p>View challenges you've committed to.</p>
        </Link>
      </div>

      {/* 📊 Habit Summary UI */}
      {showHabitSummary && habitSummary && (
        <div className="mt-6 bg-blue-50 border border-blue-300 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            📊 Habit Tracker Summary
          </h2>
          <ul className="text-gray-800 list-disc pl-5 space-y-2">
            <li>🔥 Current Streak: {habitSummary.streak} Days</li>
            <li>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5" />
                Habits Completed This Week: {habitSummary.weeklyCount}
              </div>
            </li>
            <li>🏆 Top Habit: {habitSummary.topHabit}</li>
          </ul>
          <div className="text-center mt-4">
            <Link
              to="/habit-tracker"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
            >
              Open Full Tracker
            </Link>
          </div>
        </div>
      )}

      {/* 🎯 Joined Challenges */}
      {joinedChallenges.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            🎯 Your Joined Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedChallenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-300 p-4 rounded-xl shadow-sm text-blue-800 flex items-center gap-2"
              >
                <CheckCircle className="text-blue-600 w-5 h-5" />
                <span>{challenge}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-lg mb-2">
            You haven't joined any challenges yet!
          </p>
          <Link
            to="/challenges"
            className="inline-block mt-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
          >
            Explore Challenges
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
