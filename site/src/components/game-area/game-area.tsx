'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Drawer from './drawer';

export default function GameArea() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = [
    {
      question: 'Translate "The cat drinks milk" to Spanish',
      options: [
        'El gato bebe leche',
        'La gata bebe leche',
        'El gato bebe agua',
        'La gata come pescado',
      ],
      correctAnswer: 'El gato bebe leche',
    },
    {
      question: 'Which sentence means "I like to read books" in Spanish?',
      options: [
        'Me gusta leer libros',
        'Yo leo libros',
        'Los libros son buenos',
        'Leer es divertido',
      ],
      correctAnswer: 'Me gusta leer libros',
    },
    {
      question: 'Translate "We are going to the beach" to Spanish',
      options: [
        'Vamos a la playa',
        'Estamos en la playa',
        'Fuimos a la playa',
        'Iremos a la playa',
      ],
      correctAnswer: 'Vamos a la playa',
    },
  ];

  const handleAnswer = (answer: string) => {
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setIsDrawerOpen(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setIsDrawerOpen(false);
      if (correct) {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Game completed logic here
          alert(
            `Congratulations! You completed all questions. Your score: ${score + 1}/${questions.length}`
          );
          setCurrentQuestion(0);
          setScore(0);
        }
      }
    }, 2000); // Close drawer after 2 seconds
  };

  return (
    <div className="flex-1 bg-white p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {questions[currentQuestion].question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isCorrect={isCorrect}
      />
    </div>
  );
}
