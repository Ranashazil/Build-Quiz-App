import { useState, useEffect } from 'react';
import quiz from './components/questions';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setAnswer] = useState([]);
  const [scoreRate, setScoreRate] = useState(0);
  const [resultMessage, setResultMessage] = useState(null);

  const handlingAnswer = (select) => {
    const isCorrect = quiz[currentQuestion].correctAnswer === select;
    setAnswer([...userAnswer, { question: currentQuestion, answer: select }]);
    if (isCorrect) {
      setScoreRate(scoreRate + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetIt = () => {
    setCurrentQuestion(0);
    setScoreRate(0);
    setAnswer([]);
    setResultMessage(null); // Clear the result message
  };

  useEffect(() => {
    if (currentQuestion >= quiz.length) {
      if (scoreRate < 10) {
        setResultMessage("Sorry, you have failed the quiz. Better luck next time!");
      } else {
        setResultMessage("Congratulations, you have passed the quiz!");
      }

      // Hide the message after 3 seconds
      const timer = setTimeout(() => setResultMessage(null), 3000);
      return () => clearTimeout(timer); // Clear the timer when component unmounts or question changes
    }
  }, [currentQuestion, scoreRate, quiz.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Quiz App</h1>
      <p className="text-lg text-white mb-6">Live Score: {scoreRate}</p>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {currentQuestion < quiz.length ? (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {quiz[currentQuestion].question}
              </h2>
            </div>
            <ul className="space-y-2">
              {quiz[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg border border-gray-300"
                  onClick={() => handlingAnswer(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Result</h2>
            <p className="text-lg text-gray-600 mb-6">
              {scoreRate} / {quiz.length}
            </p>
            {resultMessage && (
              <p
                className={`${
                  scoreRate < 10 ? "text-red-500" : "text-green-500"
                } text-xl font-semibold mb-4`}
              >
                {resultMessage}
              </p>
            )}
            <button
              onClick={resetIt}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
