import React, { useState } from 'react';

const TrackerForm = () => {
  const [formData, setFormData] = useState({
    sleepHours: '',
    waterIntake: '',
    exerciseMinutes: '',
  });

  const [score, setScore] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateScore = () => {
    const { sleepHours, waterIntake, exerciseMinutes } = formData;
    let score = 0;
    if (sleepHours >= 7) score += 10;
    if (waterIntake >= 2) score += 10;
    if (exerciseMinutes >= 30) score += 10;
    setScore(score);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Daily Input</h2>
      <input name="sleepHours" type="number" placeholder="Hours of Sleep" onChange={handleChange} className="input" />
      <input name="waterIntake" type="number" placeholder="Water Intake (liters)" onChange={handleChange} className="input" />
      <input name="exerciseMinutes" type="number" placeholder="Exercise Minutes" onChange={handleChange} className="input" />
      <button onClick={calculateScore} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Calculate Score</button>
      {score !== null && <p className="mt-4 text-lg">Your Score: {score}/30</p>}
    </div>
  );
};

export default TrackerForm;
