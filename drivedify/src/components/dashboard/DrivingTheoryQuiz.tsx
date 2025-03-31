import React, { useState } from 'react';

const DrivingTheoryQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What does a red traffic light mean?",
      options: ["Stop", "Go", "Caution"],
      answer: "Stop"
    },
    {
      question: "What should you do at a stop sign?",
      options: ["Stop", "Slow down", "Ignore it"],
      answer: "Stop"
    },
    // Add more questions as needed
  ];

  const handleAnswer = (option: string) => {
    setAnswers([...answers, option]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Driving Theory Quiz</h3>
      {currentQuestionIndex < questions.length ? (
        <div>
          <p className="mt-2">{questions[currentQuestionIndex].question}</p>
          <div className="mt-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white rounded px-4 py-2 m-1"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-2">Quiz completed! Your answers: {answers.join(', ')}</p>
      )}
    </div>
  );
};

export default DrivingTheoryQuiz;
