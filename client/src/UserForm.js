import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    habits: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      age: parseInt(formData.age),
      habits: formData.habits.split(',').map(h => h.trim())
    };
    try {
      await axios.post('http://localhost:5000/api/users', payload);
      alert('User saved!');
      setFormData({ name: '', age: '', habits: '' });
    } catch (err) {
      alert('Error saving user.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Your Details</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
      <input name="habits" placeholder="Habits (comma-separated)" value={formData.habits} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
