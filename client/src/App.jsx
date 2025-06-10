import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import JoinedChallenges from "./pages/JoinedChallenges"; // ✅ new
import HabitTracker from "./pages/HabitTracker.tsx";
import HabitForm from "./pages/HabitForm";
import UserForm from "./UserForm.js";
import About from "./pages/About";


const App = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUserToBackend = async () => {
      if (!user) return;

      try {
        await axios.post("http://localhost:5000/api/users/clerk-user", {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName || user.username || "No Name",
        });
      } catch (error) {
        console.error("❌ Error saving user to DB:", error);
      }
    };

    saveUserToBackend();
  }, [user]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/challenges" element={<Challenges />} />

        <Route
          path="/profile"
          element={
            <SignedIn>
              <Profile />
            </SignedIn>
          }
        />
        <Route
          path="/habit-tracker"
          element={
            <SignedIn>
              <HabitTracker />
            </SignedIn>
          }
        />
        <Route
          path="/habit-form"
          element={
            <SignedIn>
              <HabitForm />
            </SignedIn>
          }
        />
        <Route
          path="/joined-challenges"
          element={
            <SignedIn>
              <JoinedChallenges />
            </SignedIn>
          }
        />

        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
