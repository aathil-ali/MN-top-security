import React from 'react';

interface Answer {
  question: string;
  selectedOption: string;
  correctAnswer: string;
}

interface QuizResultProps {
  answers: Answer[];
}

export function QuizResult({ answers }: QuizResultProps) {
  const correctCount = answers.filter(answer => answer.selectedOption === answer.correctAnswer).length;

  return (
    <div className="quiz-results">
      <div className="flex items-center justify-between mb-20 reveal">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-white font-medium px-3 py-1 rounded-full">{correctCount}/{answers.length}</div>
          <span className="text-gray-500 dark:text-gray-400">Correct</span>
        </div>
      </div>
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between reveal">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full ${answer.selectedOption === answer.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{answer.question}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`text-white font-medium px-3 py-1 rounded-full ${answer.selectedOption === answer.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`}>
                  {answer.selectedOption === answer.correctAnswer ? 'Correct' : 'Incorrect'}
                </div>
              </div>
            </div>
            {answer.selectedOption !== answer.correctAnswer && (
              <div className="flex items-center justify-between reveal ml-7">
                <span className="text-gray-500 dark:text-gray-400">Correct Answer: {answer.correctAnswer}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
