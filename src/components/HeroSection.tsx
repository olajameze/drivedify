import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <section className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
              <h1 className="text-5xl font-bold">DrivEdify</h1>
              <p className="mt-4 text-lg">Your premium driving instructor web app is coming soon!</p>
              <form className="mt-6">
                <input type="email" placeholder="Enter your email" className="p-2 rounded" />
                <button type="submit" className="ml-2 p-2 bg-white text-blue-500 rounded">Join the Waiting List</button>
              </form>
            </section>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Access Dashboard
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;