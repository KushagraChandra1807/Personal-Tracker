import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const JoinedChallenges = () => {
  const { user, isLoaded } = useUser();
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJoinedChallenges = async () => {
      if (!isLoaded || !user?.id) return;

      try {
        const res = await axios.get(`/api/joined-challenges/${user.id}`);
        const challengeList = res.data?.challenges?.map(c =>
          typeof c === "string" ? c : c.challenge
        ) || [];

        setChallenges(challengeList);
      } catch (error) {
        console.error("❌ Error fetching joined challenges:", error);
      }
    };

    fetchJoinedChallenges();
  }, [user, isLoaded]);

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Joined Challenges
      </h1>

      {challenges.length === 0 ? (
        <div className="text-center p-6 bg-white rounded-2xl shadow">
          <p className="text-lg text-gray-600 mb-4">
            Start your productive life today! Join challenges and conquer them.
          </p>
          <button
            onClick={() => navigate("/challenges")}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition"
          >
            Join Challenges
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {challenges.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-white shadow p-4 rounded-xl border hover:bg-gray-50 transition"
            >
              {challenge}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedChallenges;
