import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner p-4 text-center text-gray-500 text-sm w-full fixed bottom-0 left-0">
      &copy; {new Date().getFullYear()} Personal Tracker. All rights reserved.
    </footer>
  );
};

export default Footer;
