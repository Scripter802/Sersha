import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import axios from 'axios';
import RightAnswerQuiz from '../RightAnswerQuiz';
import CorrectAnswerQuiz from '../CorrectAnswerQuiz';
import FillInTheBlank from '../FillInTheBlank';
import Grouping from '../Grouping';
import GameCompletedPopup from '../GameCompletedPopup'; // Import the new popup component
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const {
    baseUrl,
    currentQuizz,
    setCurrentQuizz,
    currentQuestion,
    setCurrentQuestion,
    correctAnswers,
    setCorrectAnswers,
    heartsNum,
    setHeartsNum,
    showPopup, setShowPopup,
  } = useGlobalContext();


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

  // useEffect(() => {
  //   if (currentQuizz && currentQuestion === currentQuizz.questions.length - 1) {
  //     setShowPopup(true);
  //   }
  // }, [currentQuestion, currentQuizz]);

  const handleRestart = () => {
    setShowPopup(false);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setHeartsNum(3);
    // Fetch a new quiz or reset current quiz
  };

  const handleClaimPrize = () => {
    // Handle prize claiming logic
    console.log('Prize claimed');
    setShowPopup(false);
    useNavigate('/')
  };

  let currentQ = currentQuizz?.questions[currentQuestion];

  return (
    <>
      {showPopup && (
        <GameCompletedPopup
          correctAnswers={correctAnswers}
          mistakes={currentQuizz.questions.length - correctAnswers}
          onRestart={handleRestart}
          onClaimPrize={handleClaimPrize}
        />
      )}

      {!showPopup && currentQ && (
        <>
          {currentQ.type === 0 && <RightAnswerQuiz currentQ={currentQ} />}
          {currentQ.type === 1 && <CorrectAnswerQuiz currentQ={currentQ} />}
          {currentQ.type === 2 && <FillInTheBlank currentQ={currentQ} />}
          {currentQ.type === 3 && <Grouping currentQ={currentQ} />}
        </>
      )}
    </>
  );
};

export default QuizPage;
