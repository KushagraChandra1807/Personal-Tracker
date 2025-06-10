import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

const Header = () => {
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-md shadow transition duration-200'
      : 'text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition duration-200';

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg px-8 py-3 flex justify-between items-center z-50 h-16">
      {/* Logo / Title */}
      <div className="text-2xl font-extrabold tracking-wider text-white">
        Personal Tracker
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        <NavLink to="/" className={navLinkStyles}>
          Home
        </NavLink>
        <NavLink to="/profile" className={navLinkStyles}>
          Profile
        </NavLink>
        <NavLink to="/challenges" className={navLinkStyles}>
          Challenges
        </NavLink>

        {/* Auth Buttons */}
        <SignedIn>
          <div className="ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100 transition duration-200">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
