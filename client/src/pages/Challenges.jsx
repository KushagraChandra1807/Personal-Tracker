import React, { useState, useEffect } from 'react';
import { Star, Calendar, CheckCircle, ChevronDown } from 'lucide-react';
import axios from '../lib/axios';
import { useUser } from '@clerk/clerk-react';

const Challenges = () => {
  const { user, isLoaded } = useUser();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [monthlyOpen, setMonthlyOpen] = useState(false);
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  const weeklyChallenges = [
    "Walk 10,000 steps every day",
    "Drink 2L of water daily",
    "Avoid junk food for a week",
  ];

  const monthlyChallenges = [
    "Read 2 self-help books",
    "Exercise 5 times a week",
    "Sleep 8 hours a night for 30 days",
  ];

  // ✅ Fetch joined challenges on load
  useEffect(() => {
    const fetchJoined = async () => {
  try {
    console.log("🔍 Fetching for user ID:", user?.id);
    const res = await axios.get(`/api/challenges/joined/${user?.id}`);

    console.log("📦 Raw response data:", res.data);

    // ✅ Extract challenge names from the array
    const normalized = res.data.data.map((item) => item.challenge);

    console.log("✅ Normalized challenges:", normalized);

    setJoinedChallenges(normalized);
  } catch (error) {
    console.error("❌ Error fetching joined challenges:", error);
  }
};


    if (isLoaded && user?.id) {
      fetchJoined();
    }
  }, [isLoaded, user]);

  const handleJoin = async (challenge) => {
    if (!joinedChallenges.includes(challenge)) {
      try {
        await axios.post('/api/join-challenge', {
          clerkId: user.id,
          challenge,
        });
        setJoinedChallenges((prev) => [...prev, challenge]);
      } catch (err) {
        console.error("❌ Error joining challenge:", err);
      }
    }
  };

  const ChallengeCard = ({ title, icon: Icon, color, isOpen, onToggle, challenges }) => (
    <div className="bg-white rounded-2xl border shadow-md transition-all duration-300 self-start w-full md:w-[48%]">
      <div onClick={onToggle} className="p-5 cursor-pointer flex justify-between items-center">
        <div>
          <h2 className={`text-xl font-semibold flex items-center gap-2 text-${color}-600`}>
            <Icon className="w-5 h-5" />
            {title}
          </h2>
          <p className="text-sm text-gray-700">
            {title === "Weekly Challenges"
              ? "Fun and engaging tasks every week to keep you motivated."
              : "Take it up a notch with monthly goals and rewards."}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[1000px] py-3 px-5' : 'max-h-0 px-5'
      }`}>
        {isOpen && challenges.map((challenge, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-50 border rounded-xl p-3 mb-3 hover:bg-gray-100 transition"
          >
            <span className="text-gray-800">{challenge}</span>
            {joinedChallenges.includes(challenge) ? (
              <span className="text-green-600 flex items-center gap-1 text-sm">
                <CheckCircle className="w-4 h-4" /> Joined
              </span>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoin(challenge);
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-500 transition"
              >
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Challenges
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Take on challenges to boost your motivation and track progress.
      </p>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <ChallengeCard
          title="Weekly Challenges"
          icon={Star}
          color="purple"
          isOpen={weeklyOpen}
          onToggle={() => setWeeklyOpen(prev => !prev)}
          challenges={weeklyChallenges}
        />
        <ChallengeCard
          title="Monthly Challenges"
          icon={Calendar}
          color="purple"
          isOpen={monthlyOpen}
          onToggle={() => setMonthlyOpen(prev => !prev)}
          challenges={monthlyChallenges}
        />
      </div>
    </div>
  );
};

export default Challenges;
