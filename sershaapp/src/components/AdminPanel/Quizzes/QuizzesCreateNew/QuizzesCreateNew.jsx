import React, { useState } from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';

import './quizzesCreateNew.css';

const QuizzesCreateNew = () => {
  const { baseUrl, setQuizzesCreateNew } = useGlobalContext();
  const [currentQuestion, setCurrentQuestion] = useState({
    stage: '',
    quizName: '',
    conversationStarter: '',
    questions: [
      {
        type: '',
        text: '',
        answers: [{ text: '', isCorrect: false }],
        statement1: '',
        statement2: '',
        groups: [
          { name: '', groupingItems: [{ item: '' }] },
          { name: '', groupingItems: [{ item: '' }] }
        ],
      }
    ]
  });

  let dif = currentQuestion.stage === 'Easy' ? 0 : currentQuestion.stage === 'Medium' ? 1 : 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('difficulty', dif);
    formData.append('quizName', currentQuestion.quizName);
    formData.append('conversationStarter', currentQuestion.conversationStarter);

    currentQuestion.questions.forEach((question, qIndex) => {
      let type = question.type === 'Right Answer' ? 0 : question.type === 'Correct/Incorrect' ? 1 : question.type === 'Fill in The Blank' ? 2 : 3;

      if (type === 3) {
        question.text = 'Place the words into the appropriate groups';
      }

      if (type === 1) {
        if (question.isCorrect === undefined) {
          question.isCorrect = false;
        }
        formData.append(`questions[${qIndex}][isCorrect]`, question.isCorrect);
      }
      formData.append(`questions[${qIndex}][type]`, type);
      formData.append(`questions[${qIndex}][text]`, question.text);
      formData.append(`questions[${qIndex}][statement1]`, question.statement1);
      formData.append(`questions[${qIndex}][statement2]`, question.statement2);

      question.answers.forEach((answer, aIndex) => {
        formData.append(`questions[${qIndex}][answers][${aIndex}][text]`, answer.text);
        formData.append(`questions[${qIndex}][answers][${aIndex}][isCorrect]`, answer.isCorrect);
      });

      question.groups.forEach((group, gIndex) => {
        formData.append(`questions[${qIndex}][groups][${gIndex}][name]`, group.name);
        group.groupingItems.forEach((item, iIndex) => {
          formData.append(`questions[${qIndex}][groups][${gIndex}][groupingItems][${iIndex}][item]`, item.item);
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
            { name: '', groupingItems: [{ item: '' }] },
            { name: '', groupingItems: [{ item: '' }] }
          ],
          isCorrect: false,
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

  const handleIsCorrectChange = (qIndex, value) => {
    console.log(`value: ${value}`)
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].isCorrect = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleAddAnswer = (qIndex) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].answers.push({ text: '', isCorrect: false });
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleAddGroupItem = (qIndex, gIndex) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].groups[gIndex].groupingItems.push({ item: '' });
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleGroupChange = (qIndex, gIndex, field, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].groups[gIndex][field] = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const handleGroupItemChange = (qIndex, gIndex, iIndex, value) => {
    const updatedQuestions = [...currentQuestion.questions];
    updatedQuestions[qIndex].groups[gIndex].groupingItems[iIndex].item = value;
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestions });
  };

  const Divider = () => {
    return (
      <hr
        style={{ borderTop: "1px dotted lightgrey", marginBlock: '1rem' }}
      ></hr>
    );
  };

  return (
    <div className="adminPanelCreateNewWrapper">
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

      <div>
        <label className='fieldLabel'>Quizz name:</label>
        <input
          className='inputField'
          type="text"
          value={currentQuestion.quizName}
          placeholder='Quizz Name'
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, quizName: e.target.value })}
        />
      </div>

      <div>
        <label className='fieldLabel'>Conversation starter:</label>
        <input
          className='inputField'
          type="textarea"
          value={currentQuestion.conversationStarter}
          placeholder='Conversation Starter'
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, conversationStarter: e.target.value })}
        />
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
                <label className='fieldLabel'>Question:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question.text}
                  placeholder='Question'
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />
              </div>
              <div className='optionsForm'>
                <label className='fieldLabel'>Options (check correct answer)</label>
                {question.answers.map((ans, aIndex) => (
                  <div className='optionBox' key={aIndex}>
                    <input
                      className='inputField'
                      type="text"
                      value={ans.text}
                      placeholder={`Option ${aIndex + 1}`}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                    />
                    <input
                      className='inputField'
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
              <Divider />
            </>
          )}

          {question.type === 'Correct/Incorrect' && (
            <>
              <div>
                <label className='fieldLabel'>Statement:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question.text}
                  placeholder='Statement'
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />
              </div>
              <div className='optionsForm'>
                <label className='fieldLabel'>Options</label>
                <div className='optionBox'>
                  <label>
                    True
                    <input
                      id='correctIncorrectTrue'
                      className='inputField'
                      type="checkbox"
                      checked={question.isCorrect}
                      onChange={(e) => handleIsCorrectChange(qIndex, e.target.checked)}
                    />
                  </label>
                </div>
              </div>
              <Divider />
            </>
          )}

          {question.type === 'Fill in The Blank' && (
            <>
              <div>
                <label className='fieldLabel'>Statement 1:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question.statement1}
                  placeholder='Statement 1'
                  onChange={(e) => handleQuestionChange(qIndex, 'statement1', e.target.value)}
                />
              </div>
              <div>
                <label className='fieldLabel'>Statement 2:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question.statement2}
                  placeholder='Statement 2'
                  onChange={(e) => handleQuestionChange(qIndex, 'statement2', e.target.value)}
                />
              </div>
              <div className='optionsForm'>
                <label className='fieldLabel'>Options</label>
                {question.answers.map((ans, aIndex) => (
                  <div className='optionBox' key={aIndex}>
                    <input
                      className='inputField'
                      type="text"
                      value={ans.text}
                      placeholder={`Option ${aIndex + 1}`}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                    />
                    <input
                      className='inputField'
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
              <Divider />
            </>
          )}

          {question.type === 'Grouping' && (
            <>
              <div>
                <label className='fieldLabel'>Group 1 Name:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question.groups[0].name}
                  placeholder='Group 1 Name'
                  onChange={(e) => handleGroupChange(qIndex, 0, 'name', e.target.value)}
                />
              </div>
              <div className='optionsForm'>
                <label className='fieldLabel'>Options</label>
                {question?.groups[0]?.groupingItems.map((item, iIndex) => (
                  <div className='optionBox' key={iIndex}>
                    <input
                      className='inputField'
                      type="text"
                      value={item.item}
                      placeholder={`Option ${iIndex + 1}`}
                      onChange={(e) => handleGroupItemChange(qIndex, 0, iIndex, e.target.value)}
                    />
                  </div>
                ))}
                <button className='addNewOptionFieldBtn' onClick={() => handleAddGroupItem(qIndex, 0)}>
                  <div className='incrementCharacter'>+</div>
                </button>
              </div>
              <div>
                <label className='fieldLabel'>Group 2 Name:</label>
                <input
                  className='inputField'
                  type="text"
                  value={question?.groups[1]?.name}
                  placeholder='Group 2 Name'
                  onChange={(e) => handleGroupChange(qIndex, 1, 'name', e.target.value)}
                />
              </div>
              <div className='optionsForm'>
                <label className='fieldLabel'>Options</label>
                {question.groups[1].groupingItems.map((item, iIndex) => (
                  <div className='optionBox' key={iIndex}>
                    <input
                      className='inputField'
                      type="text"
                      value={item.item}
                      placeholder={`Option ${iIndex + 1}`}
                      onChange={(e) => handleGroupItemChange(qIndex, 1, iIndex, e.target.value)}
                    />
                  </div>
                ))}
                <button className='addNewOptionFieldBtn' onClick={() => handleAddGroupItem(qIndex, 1)}>
                  <div className='incrementCharacter'>+</div>
                </button>
              </div>
              <Divider />
            </>
          )}
        </div>
      ))}

      <button className='newQuestionBtn' onClick={handleAddQuestion}>Add New Question</button>
      <button className='submitBtn' onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizzesCreateNew;
