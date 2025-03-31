import React, { useState } from 'react';

const LessonNotes: React.FC = () => {
  const [notes, setNotes] = useState('');

  const handleSaveNotes = () => {
    // Logic to save notes (e.g., API call or context update)
    console.log('Notes saved:', notes);
    setNotes(''); // Clear the notes after saving
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Lesson Notes</h3>
      <textarea
        className="mt-2 w-full h-32 border border-gray-300 rounded p-2"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />
      <button
        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={handleSaveNotes}
      >
        Save Notes
      </button>
    </div>
  );
};

export default LessonNotes;
