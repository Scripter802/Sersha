import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';

import './quizzesCreateNew.css';

const QuizzesCreateNew = () => {
  const { baseUrl, setQuizzesCreateNew } = useGlobalContext();
  const [currentQuestion, setCurrentQuestion] = useState({
    stage: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [{ text: '', isCorrect: false }],
        statement1: '',
        statement2: '',
        groups: [
          { groupName: '', items: [{ item: '' }, { item: '' }, { item: '' }] },
          { groupName: '', items: [{ item: '' }, { item: '' }, { item: '' }] }
        ],
      }
    ]
  });

  let dif = currentQuestion.stage === 'Easy' ? 0 : currentQuestion.stage === 'Medium' ? 1 : 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('difficulty', dif);

    currentQuestion.questions.forEach((question, qIndex) => {
      let type = question.type === 'Right Answer' ? 0 : question.type === 'Correct/Incorrect' ? 1 : question.type === 'Fill in The Blank' ? 2 : 3;


      if (type == 3) {
        question.text = 'Place the words into the appropriate groups';

      }
      formData.append(`questions[${qIndex}][type]`, type);
      formData.append(`questions[${qIndex}][questionText]`, question.text);
      formData.append(`questions[${qIndex}][statement1]`, question.statement1);
      formData.append(`questions[${qIndex}][statement2]`, question.statement2);

      question.answers.forEach((answer, aIndex) => {
        formData.append(`questions[${qIndex}][answers][${aIndex}][text]`, answer.text);
        formData.append(`questions[${qIndex}][answers][${aIndex}][isCorrect]`, answer.isCorrect);
      });

      question.groups.forEach((group, gIndex) => {
        formData.append(`questions[${qIndex}][groups][${gIndex}][groupName]`, group.groupName);
        group.items.forEach((item, iIndex) => {
          formData.append(`questions[${qIndex}][groups][${gIndex}][items][${iIndex}][item]`, item.item);
        });
      });
    });

    try {
      const response = await axios.post(`${baseUrl}/Quizzes/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setQuizzesCreateNew(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = () => {
    setCurrentQuestion({
      ...currentQuestion,
      questions: [
        ...currentQuestion.questions,
        {
          type: '',
          text: '',
          answers: [{ text: '', isCorrect: false }],
          statement1: '',
          statement2: '',
          groups: [
            { groupName: '', items: [{ item: '' }, { item: '' }, { item: '' }] },
            { groupName: '', items: [{ item: '' }, { item: '' }, { item: '' }] }
          ],
        }
      ]
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[index][field] = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleAddAnswer = (qIndex) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleGroupChange = (qIndex, gIndex, field, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].groups[gIndex][field] = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleGroupItemChange = (qIndex, gIndex, iIndex, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].groups[gIndex].items[iIndex].item = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  return (
    <div className="newRightAnswerQuestionContainer">
      <div className="close-btn" onClick={() => setQuizzesCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center">Create New Quiz</h3>

      <div>
        <label>Bundle</label>
        <select
          className='postBundles'
          value={currentQuestion.stage}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, stage: e.target.value })}
        >
          <option value="" disabled>Select Bundle</option>
          <option value="Easy">Easy Bundle</option>
          <option value="Medium">Medium Bundle</option>
          <option value="Hard">Hard Bundle</option>
        </select>
      </div>

      {currentQuestion.questions.map((question, qIndex) => (
        <div key={qIndex} className="newQuestionContainer">
          <div>
            <label>Question type</label>
            <select
              className='postBundles'
              value={question.type}
              onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
            >
              <option value="" disabled>Select Type</option>
              <option value="Right Answer">Right Answer</option>
              <option value="Correct/Incorrect">Correct/Incorrect</option>
              <option value="Fill in The Blank">Fill in The Blank</option>
              <option value="Grouping">Grouping</option>
            </select>
          </div>

          {question.type === 'Right Answer' && (
            <>
              <div>
                <label className='questionFieldLabel'>Question:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.text}
                  placeholder='Question'
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />
              </div>
              <div className='newRightAnswerOptions'>
                <label className='optionsFieldLabel'>Options (check correct answer)</label>
                {question.answers.map((ans, aIndex) => (
                  <div className='optionBox' key={aIndex}>
                    <input
                      className='postProfileName'
                      type="text"
                      value={ans.text}
                      placeholder={`Option ${aIndex + 1}`}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                    />
                    <input
                      className='postProfileName'
                      type="checkbox"
                      checked={ans.isCorrect}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'isCorrect', e.target.checked)}
                    />
                  </div>
                ))}
                <button className='addNewOptionFieldBtn' onClick={() => handleAddAnswer(qIndex)}>
                  <div className='incrementCharacter'>+</div>
                </button>
              </div>
            </>
          )}

          {question.type === 'Correct/Incorrect' && (
            <>
              <div>
                <label className='questionFieldLabel'>Statement:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.text}
                  placeholder='Statement'
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />
              </div>
              <div className='newRightAnswerOptions'>
                <label className='optionsFieldLabel'>Options</label>
                <div className='optionBox'>
                  <label>
                    True
                    <input
                      className='postProfileName'
                      type="checkbox"
                      checked={question.answers[0].isCorrect}
                      onChange={(e) => handleAnswerChange(qIndex, 0, 'isCorrect', e.target.checked)}
                    />
                  </label>
                  <label>
                    False
                    <input
                      className='postProfileName'
                      type="checkbox"
                      checked={question?.answers[1]?.isCorrect}
                      onChange={(e) => handleAnswerChange(qIndex, 1, 'isCorrect', e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {question.type === 'Fill in The Blank' && (
            <>
              <div>
                <label className='questionFieldLabel'>Statement 1:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.statement1}
                  placeholder='Statement 1'
                  onChange={(e) => handleQuestionChange(qIndex, 'statement1', e.target.value)}
                />
              </div>
              <div>
                <label className='questionFieldLabel'>Statement 2:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.statement2}
                  placeholder='Statement 2'
                  onChange={(e) => handleQuestionChange(qIndex, 'statement2', e.target.value)}
                />
              </div>
              <div className='newRightAnswerOptions'>
                <label className='optionsFieldLabel'>Options</label>
                {question.answers.map((ans, aIndex) => (
                  <div className='optionBox' key={aIndex}>
                    <input
                      className='postProfileName'
                      type="text"
                      value={ans.text}
                      placeholder={`Option ${aIndex + 1}`}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                    />
                    <input
                      className='postProfileName'
                      type="checkbox"
                      checked={ans.isCorrect}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'isCorrect', e.target.checked)}
                    />
                  </div>
                ))}
                <button className='addNewOptionFieldBtn' onClick={() => handleAddAnswer(qIndex)}>
                  <div className='incrementCharacter'>+</div>
                </button>
              </div>
            </>
          )}

          {question.type === 'Grouping' && (
            <>
              <div>
                <label className='questionFieldLabel'>Group 1 Name:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.groups[0].groupName}
                  placeholder='Group 1 Name'
                  onChange={(e) => handleGroupChange(qIndex, 0, 'groupName', e.target.value)}
                />
              </div>
              <div className='newRightAnswerOptions'>
                <label className='optionsFieldLabel'>Options</label>
                {question.groups[0].items.map((item, iIndex) => (
                  <div className='optionBox' key={iIndex}>
                    <input
                      className='postProfileName'
                      type="text"
                      value={item.item}
                      placeholder={`Option ${iIndex + 1}`}
                      onChange={(e) => handleGroupItemChange(qIndex, 0, iIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className='questionFieldLabel'>Group 2 Name:</label>
                <input
                  className='newRightAnswerQuestionInput'
                  type="text"
                  value={question.groups[1].groupName}
                  placeholder='Group 2 Name'
                  onChange={(e) => handleGroupChange(qIndex, 1, 'groupName', e.target.value)}
                />
              </div>
              <div className='newRightAnswerOptions'>
                <label className='optionsFieldLabel'>Options</label>
                {question.groups[1].items.map((item, iIndex) => (
                  <div className='optionBox' key={iIndex}>
                    <input
                      className='postProfileName'
                      type="text"
                      value={item.item}
                      placeholder={`Option ${iIndex + 1}`}
                      onChange={(e) => handleGroupItemChange(qIndex, 1, iIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      <button className='newPostBtn' onClick={handleAddQuestion}>Add New Question</button>
      <button className='newPostBtn' onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizzesCreateNew;
