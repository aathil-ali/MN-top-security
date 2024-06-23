import React, { useState, SetStateAction, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { QuizResult } from './quiz-result';
import { account, fetchQuizAnswers, getQuiz, saveQuizResult } from '@/lib/server/appwrite';
import { Skeleton } from "@/components/ui/skeleton"


interface QuizData {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Answer {
  question: string;
  selectedOption: string;
  correctAnswer: string;
}


interface QuizProps {
  id: number;
}

export function Quiz( { id } : QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [user, setUser] = useState(null);
  const [savedResult,setSavedResult] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
        fetchQuizResult(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchModules();
   
  }, []);


  const fetchQuizResult = async (user:any)=>{
    setSavedResult(true);
    const fetchedAnswers = await fetchQuizAnswers(user.$id, id)

    if(fetchedAnswers) {
      setAnswers(fetchedAnswers);
      setShowResults(true);
    }
    setSavedResult(false);
  
  }
  
  const fetchModules = async () => {
    try {
      console.log('fetchModules called'); // Debug log
      console.log('fetchModules called'); // Debug log

      const response = await getQuiz(id);
      console.log("Response------", response);

      if (response && response.documents) {
        const fetchedModules = response.documents.map((document: any) => ({
          question: document.question,
          options: document.options,
          correctAnswer: document.answer,
          // Add more fields as needed
        }));

        console.log("MODULES", fetchedModules);
        setQuizData(fetchedModules);
      } else {
        console.error('No documents found in response:', response);
        setQuizData([]); // Handle no documents case
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleOptionSelect = (option: SetStateAction<string>) => {
    setSelectedOption(option);
    console.log("SELECTED OPTION")
  };

  const handleNextQuestion = () => {
    setAnswers(prevAnswers => [
      ...prevAnswers,
      { question: quizData[currentIndex].question, selectedOption, correctAnswer: quizData[currentIndex].correctAnswer }
    ]);
    console.log("",answers);
    setCurrentIndex((prevIndex: number) => prevIndex + 1);
    setSelectedOption('');
  };

  const  handleFinalSubmit = async () => {

    setAnswers(prevAnswers => [
      ...prevAnswers,
      { question: quizData[currentIndex].question, selectedOption, correctAnswer: quizData[currentIndex].correctAnswer }
    ]);
    console.log("",answers);
    await saveQuizResult(user.$id, id, answers);

    setShowResults(true);
  };

  return (
    <div key="1" className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-md shadow quiz">
    {quizData.length === 0  || savedResult ? (
     <div className="space-y-6">
     <div className="flex justify-between items-center mb-6">
       <div className="text-sm space-y-2">
         <Skeleton className="h-4 w-[150px]" />
         <Skeleton className="h-4 w-[150px]" />
       </div>
       <div className="flex items-center space-x-2">
         <Skeleton className="h-4 w-[100px]" />
         <Skeleton className="h-4 w-[70px]" />
       </div>
     </div>
     <Skeleton className="h-6 w-full mb-4" />
     <div className="space-y-4">
       {[...Array(4)].map((_, index) => (
         <Skeleton key={index} className="h-4 w-full" />
       ))}
     </div>
     <div className="flex justify-between mt-6">
       <Skeleton className="h-10 w-[120px]" />
       <Skeleton className="h-10 w-[120px]" />
     </div>
   </div>
    ) : (
      !showResults ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm">
              <span className="font-semibold">Questions No:</span>
              {currentIndex + 1}/{quizData.length}
              <span className="ml-4 font-semibold">Total Attempted:</span>
              {currentIndex}/{quizData.length}
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold">Time remaining:</span>
              <span className="ml-2 text-sm">No Limit</span>
            </div>
          </div>
          <div className="text-xl font-bold mb-4">{quizData[currentIndex]?.question}</div>
          <form className="grid grid-cols-1 gap-4 mb-6">
            {quizData[currentIndex].options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  className="form-radio h-5 w-5 text-orange-500"
                  name="question"
                  type="radio"
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </form>
          <div className="flex justify-between">
            {currentIndex < quizData.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedOption}
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleFinalSubmit}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                disabled={!selectedOption}
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Submit
              </Button>
            )}
          </div>
        </>
      ) : (
        <QuizResult answers={answers} />
      )
    )}
  </div>
  
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
