import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import SingleQuizzCreateNew from './SingleQuizzCreateNew/SingleQuizzCreateNew';
import axios from 'axios';
import './singleQuizz.css';

const SingleQuizz = ({ quizz, setIsSingleQuizz }) => {
  const { baseUrl, quizzCreateNew } = useGlobalContext();
  const [quizData, setQuizData] = useState({ ...quizz });

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setQuizData({ ...quizData, [field]: value });
  };

  const handleQuestionChange = (e, index, field, type) => {
    let value;
    if (type == 1) {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex, field) => {
    const value = e.target.value;
    console.log(value)
    const updatedQuestions = [...quizData.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].answers];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], [field]: value };
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], answers: updatedOptions };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleAnswerChange = (e, questionIndex, optionIndex, field) => {
    const value = e.target.checked;
    const updatedQuestions = [...quizData.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].answers];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], [field]: value };
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], answers: updatedOptions };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleEditQuizz = async () => {
    const formData = new FormData();

    // Append basic quiz data
    formData.append('id', quizData.id);
    formData.append('quizName', quizData.quizName);
    formData.append('conversationStarter', quizData.conversationStarter);
    formData.append('difficulty', quizData.difficulty);

    // Append questions and their nested answers/groups/items
    quizData.questions.forEach((question, qIndex) => {
      formData.append(`questions[${qIndex}].id`, question.id);
      formData.append(`questions[${qIndex}].text`, question.text);
      formData.append(`questions[${qIndex}].content`, question.content);
      formData.append(`questions[${qIndex}].quizId`, question.quizId);
      formData.append(`questions[${qIndex}].type`, question.type);

      if (question.answers) {
        question.answers.forEach((answer, aIndex) => {
          formData.append(`questions[${qIndex}].answers[${aIndex}].id`, answer.id);
          formData.append(`questions[${qIndex}].answers[${aIndex}].text`, answer.text);
          formData.append(`questions[${qIndex}].answers[${aIndex}].isCorrect`, answer.isCorrect);
          formData.append(`questions[${qIndex}].answers[${aIndex}].questionId`, answer.questionId);
        });
      }

      if (question.groups) {
        question.groups.forEach((group, gIndex) => {
          formData.append(`questions[${qIndex}].groups[${gIndex}].id`, group.id);
          formData.append(`questions[${qIndex}].groups[${gIndex}].name`, group.name);
          formData.append(`questions[${qIndex}].groups[${gIndex}].groupingQuestionId`, group.groupingQuestionId);

          group.groupingItems.forEach((item, iIndex) => {
            formData.append(`questions[${qIndex}].groups[${gIndex}].groupingItems[${iIndex}].id`, item.id);
            formData.append(`questions[${qIndex}].groups[${gIndex}].groupingItems[${iIndex}].item`, item.item);
            formData.append(`questions[${qIndex}].groups[${gIndex}].groupingItems[${iIndex}].groupId`, item.groupId);
          });
        });
      }

      if (question.statement1 && question.statement2) {
        formData.append(`questions[${qIndex}].statement1`, question.statement1);
        formData.append(`questions[${qIndex}].statement2`, question.statement2);
      }
    });

    try {
      await axios.put(`${baseUrl}/Quizzes/${quizData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsSingleQuizz(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!quizData) return null;

  return (
    <div className="single-quizz-container">
      {quizzCreateNew ? (
        <SingleQuizzCreateNew />
      ) : (
        <div className='single-quizz-wrapper'>
          <div className='single-quizz-field'>
            <label className='singlequizzlabel'>Quiz Name:</label>
            <input
              className='single-quizz-input'
              type="text"
              value={quizData.quizName}
              onChange={(e) => handleInputChange(e, 'quizName')}
            />
          </div>
          <div className='single-quizz-field'>
            <label className='single-quizz-label'>Conversation Starter:</label>
            <input
              className='single-quizz-input'
              type="text"
              value={quizData.conversationStarter}
              onChange={(e) => handleInputChange(e, 'conversationStarter')}
            />
          </div>
          <div className='single-quizz-field'>
            <label className='single-quizz-label'>Difficulty:</label>
            <select
              className='single-quizz-select'
              value={quizData.difficulty}
              onChange={(e) => handleInputChange(e, 'difficulty')}
            >
              <option value={0}>Easy</option>
              <option value={1}>Medium</option>
              <option value={2}>Hard</option>
            </select>
          </div>
          {quizData.questions.map((quest, index) => (
            <div key={index} className='single-quizz-question-container'>
              <div className='single-quizz-question-number'>No. {index + 1}</div>
              {quest.text && <div className='single-quizz-question-text'>
                <input
                  className='single-quizz-question-input'
                  type="text"
                  value={quest.text || ''}
                  onChange={(e) => handleQuestionChange(e, index, 'text', 0)}
                />
              </div>}
              {/* Options handling */}
              {quest.type === 0 && (
                <div className='single-quizz-question-details'>
                  <div className='single-quizz-options'>
                    <strong>Options:</strong>
                    {quest.answers.map((q, idx) => (
                      <div key={idx} className='single-quizz-option'>
                        <input
                          className='single-quizz-option-input'
                          type="text"
                          value={q.text}
                          onChange={(e) => handleOptionChange(e, index, idx, 'text')}
                        />
                        <label className='single-quizz-option-label'>
                          <input
                            className='single-quizz-checkbox'
                            type="checkbox"
                            checked={q.isCorrect}
                            onChange={(e) => handleAnswerChange(e, index, idx, 'isCorrect')}
                          />
                          Correct
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {quest.type === 1 && (
                <div className='single-quizz-question-details'>
                  <div className='single-quizz-options-correct-incorrect'>
                    <label className='single-quizz-label'>
                      <input
                        className='single-quizz-checkbox'
                        type="checkbox"
                        checked={quest.isCorrect}
                        onChange={(e) => handleQuestionChange(e, index, 'isCorrect', 1)}
                      />
                      Is correct
                    </label>
                  </div>
                </div>
              )}
              {quest.type === 2 && (
                <div className='single-quizz-question-details'>
                  <div>
                    <label className='single-quizz-label'>Statement 1:</label>
                    <input
                      className='single-quizz-input'
                      type="text"
                      value={quest.statement1}
                      onChange={(e) => handleQuestionChange(e, index, 'statement1', 2)}
                    />
                  </div>
                  <div>
                    <label className='single-quizz-label'>Statement 2:</label>
                    <input
                      className='single-quizz-input'
                      type="text"
                      value={quest.statement2}
                      onChange={(e) => handleQuestionChange(e, index, 'statement2', 2)}
                    />
                  </div>
                  <div className='single-quizz-question-details'>
                    <div className='single-quizz-options'>
                      <strong>Options:</strong>
                      {quest.answers.map((q, idx) => (
                        <div key={idx} className='single-quizz-option'>
                          <input
                            className='single-quizz-option-input'
                            type="text"
                            value={q.text}
                            onChange={(e) => handleOptionChange(e, index, idx, 'text')}
                          />
                          <label className='single-quizz-option-label'>
                            <input
                              className='single-quizz-checkbox'
                              type="checkbox"
                              checked={q.isCorrect}
                              onChange={(e) => handleAnswerChange(e, index, idx, 'isCorrect')}
                            />
                            Correct
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {quest.type === 3 && (
                <div className='single-quizz-question-details'>
                  {quest?.groups?.map((group, i) => (
                    <div key={i} className='single-quizz-group'>
                      {console.log(quest, group)}
                      <label className='single-quizz-label'>{`Group ${i + 1}`}</label>
                      <input className='single-quizz-input'
                        value={group.name}
                        onChange={(e) => {
                          const updatedGroups = [...quest.groups];
                          console.log(`sss ${updatedGroups[0].name}`)
                          updatedGroups[i] = { ...updatedGroups[i], name: e.target.value };
                          handleQuestionChange({ target: { value: updatedGroups } }, index, 'groups');
                        }} />
                      <strong className='single-quizz-label'>Options</strong>
                      {group?.groupingItems?.map((groupItem, idx) => (
                        <div key={idx} className='single-quizz-group-item'>
                          <input
                            className='single-quizz-group-input'
                            type="text"
                            value={groupItem.item}
                            onChange={(e) => {
                              const updatedGroupingItems = [...group.groupingItems];
                              updatedGroupingItems[idx] = { ...groupItem, item: e.target.value };
                              const updatedGroups = [...quest.groups];
                              updatedGroups[i] = { ...group, groupingItems: updatedGroupingItems };
                              handleQuestionChange({ target: { value: updatedGroups } }, index, 'groups');
                            }}
                          />

                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className='single-quizz-settings'>
            <button className="single-quizz-edit-btn" onClick={() => handleEditQuizz()}>Save changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuizz;
