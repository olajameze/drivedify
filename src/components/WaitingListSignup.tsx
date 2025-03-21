import React from 'react';

const WaitingListSignup = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold">Join Our Waiting List</h2>
      <p className="mt-4 text-lg">Be the first to know when we launch!</p>
      <form className="mt-6 max-w-md mx-auto">
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Notify Me
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600">We respect your privacy. No spam ever.</p>
      </form>
    </div>
  </section>
);

export default WaitingListSignup;