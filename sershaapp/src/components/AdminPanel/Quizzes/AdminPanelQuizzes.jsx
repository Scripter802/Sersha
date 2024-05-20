import React, { useState } from 'react'
import { useGlobalContext } from '../../../context/context';

import './adminPanelQuizzes.css'
import AdminRightAnswerPreview from './adminQuizzesPreview/AdminRightAnswerPreview/AdminRightAnswerPreview';
import AdminCorrectIncorrectPreview from './adminQuizzesPreview/AdminCorrectIncorrectPreview/AdminCorrectIncorrectPreview';
import AdminGroupingPreview from './adminQuizzesPreview/AdminGroupingPreview/AdminGroupingPreview';
import AdminFillInTheBlankPreview from './adminQuizzesPreview/AdminFillInTheBlankPreview/AdminFillInTheBlankPreview';

const AdminPanelQuizzes = () => {
  const { quizzesActiveTab } = useGlobalContext();
  const [quizzes, setQuizzes] = useState(['Right Answer', 'Correct/Incorect', 'Grouping', 'Fill in the blank']);

  return (
    <div className="adminPanelQuizzesContainer" style={{ position: 'relative' }}>
      {quizzesActiveTab === 'Right Answer' && <AdminRightAnswerPreview />}
      {quizzesActiveTab === 'Correct/Incorrect' && <AdminCorrectIncorrectPreview />}
      {quizzesActiveTab === 'Grouping' && <AdminGroupingPreview />}
      {quizzesActiveTab === 'Fill In The Blank' && <AdminFillInTheBlankPreview />}
    </div>
  );
}

export default AdminPanelQuizzes
