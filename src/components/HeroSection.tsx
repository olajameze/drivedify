import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-5xl font-bold">DrivEdify</h1>
      <p className="mt-4 text-lg">Your premium driving instructor web app is coming soon!</p>
      <form className="mt-6">
        <input type="email" placeholder="Enter your email" className="p-2 rounded" />
        <button type="submit" className="ml-2 p-2 bg-white text-blue-500 rounded">Join the Waiting List</button>
      </form>
    </section>
  );
};

export default HeroSection; 