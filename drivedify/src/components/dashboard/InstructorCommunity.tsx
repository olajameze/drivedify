import React, { useState } from 'react';

const InstructorCommunity: React.FC = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (newPost) {
      setPosts([...posts, newPost]);
      setNewPost(''); // Clear the input after posting
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Instructor Community</h3>
      <textarea
        className="mt-2 w-full h-32 border border-gray-300 rounded p-2"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Share your tips or ask a question..."
      />
      <button
        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={handlePostSubmit}
      >
        Post
      </button>
      <div className="mt-4">
        {posts.map((post, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <p>{post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCommunity;
