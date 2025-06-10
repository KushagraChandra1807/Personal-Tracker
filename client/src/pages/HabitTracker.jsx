import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from '../lib/axios';

const HabitTracker = () => {
  const { user } = useUser();
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [completedToday, setCompletedToday] = useState({});

  useEffect(() => {
    const fetchJoined = async () => {
      try {
        const res = await axios.get(`/api/challenges/joined/${user?.id}`);
        const normalized = res.data.data.map((item) => item.challenge);
        setJoinedChallenges(normalized);
      } catch (err) {
        console.error("❌ Error fetching joined challenges:", err);
      }
    };

    if (user?.id) {
      fetchJoined();
    }
  }, [user]);

  const toggleCompletion = (challenge) => {
    setCompletedToday((prev) => ({
      ...prev,
      [challenge]: !prev[challenge],
    }));

    // In the future, send to backend:
    // axios.post('/api/habits/track', { clerkId: user.id, challenge, date: new Date(), completed: true });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">🧠 Habit Tracker</h1>

      {joinedChallenges.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t joined any challenges yet.
        </p>
      ) : (
        <div className="space-y-4">
          {joinedChallenges.map((challenge, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow border">
              <span>{challenge}</span>
              <button
                onClick={() => toggleCompletion(challenge)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  completedToday[challenge]
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {completedToday[challenge] ? 'Completed' : 'Mark as Done'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
