'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('light');  

  useEffect(() => {
    // Load the theme from localStorage on initial render
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);  
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  return (
    <div className="dark:bg-gray-800 dark:text-white">
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">School Payments</div>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/transaction-by-school')}
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            Transactions by School
          </button>
          <button
            onClick={() => router.push('/transaction-status')}
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            Check Transaction Status
          </button>
          <button
            onClick={handleLogout}
            className="text-white hover:bg-red-700 p-2 rounded"
          >
            Logout
          </button>
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="text-white hover:bg-gray-700 p-2 rounded"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
