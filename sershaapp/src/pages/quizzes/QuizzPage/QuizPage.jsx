import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import RightAnswerQuiz from '../RightAnswerQuiz';
import CorrectAnswerQuiz from '../CorrectAnswerQuiz';
import FillInTheBlank from '../FillInTheBlank';
import Grouping from '../Grouping';


const QuizPage = () => {
  const { baseUrl, currentQuizz, setCurrentQuizz, currentQuestion, setCurrentQuestion } = useGlobalContext();

  useEffect(() => {
    const fetchCurrentQuizz = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Quizzes/randomByDifficulty/0`);
        setCurrentQuizz(response.data);
      } catch (error) {
        console.error('Error fetching right answer questions:', error);
      }
    };

    fetchCurrentQuizz();
  }, []);

  let currentQ = currentQuizz?.questions[currentQuestion]

  console.log(`CC:  ${currentQ}`)
  return (
    <>

      {currentQuizz?.questions[currentQuestion].type == 0 && <RightAnswerQuiz currentQ={currentQ} />}
      {currentQuizz?.questions[currentQuestion].type == 1 && <CorrectAnswerQuiz currentQ={currentQ} />}
      {currentQuizz?.questions[currentQuestion].type == 2 && <FillInTheBlank currentQ={currentQ} />}
      {currentQuizz?.questions[currentQuestion].type == 3 && <Grouping currentQ={currentQ} />}

    </>
  )
}

export default QuizPage