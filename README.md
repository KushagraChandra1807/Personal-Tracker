

```markdown
# 🌟 Personal Tracker

A full-stack habit and challenge tracker to help users build momentum, boost productivity, and stay on track—all with a beautiful interface and secure user experience.

---

## 🚀 Features

- 🔐 **Authentication with Clerk**  
  Users can sign in securely—user data is saved in MongoDB.

- 🏠 **Home Dashboard**  
  Three feature-rich cards:
  - ✅ **Calculate Habit Score** — tick off completed habits to see your progress.
  - 📊 **Track Habit** — monitor habits over time.
  - 🏆 **Joined Challenges** — view all challenges the user has enrolled in.

- 👤 **Profile Page**  
  - **Account Details** — fetches user data from MongoDB.
  - **Settings** — manage personal preferences.

- 📅 **Challenges Section**
  - **Monthly Challenges** — long-term commitment options.
  - **Weekly Challenges** — quick, bite-sized goals.
  - All participation data is stored with the user in the database.

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Clerk
- **Version Control**: Git, GitHub

---

## 📦 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KushagraChandra1807/Personal-Tracker.git
   ```

2. **Install Dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure `.env` Files**  
   Add your environment variables for both client and server.

4. **Run the App**
   ```bash
   cd server && npm start
   cd ../client && npm start
   ```

---

## 📁 Project Structure

```bash
FINALASSIGNMENT/
│
├── client/          # React frontend
│   └── src/pages/   # Core pages like TrackerForm
│
├── server/          # Express backend
│   ├── routes/      # API routes (habits, users, challenges)
│   ├── models/      # MongoDB models
│   ├── controllers/ # Logic for handling routes
│   └── server.js    # Main entry point
```

---

## 🙌 Contributing

Open to ideas and contributions! Feel free to fork, pull, or suggest improvements.

---

Built with ❤️ by Kushagra
```

Want me to jazz it up with some shields or GitHub stats? We can even generate a project logo next if you're feeling spicy 🎨🔥  
Let’s make this repo shine.
