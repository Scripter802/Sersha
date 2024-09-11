import avatar from '../../assets/images/navbar/userpick.png';

const AnswersMsg = ({ selectedMessage, currentAnswer, handleAnswer }) => {
  const userData = JSON.parse(localStorage.getItem('userData'))

  return (
    <>
      {selectedMessage?.responses?.map(ans => {
        return (
          !currentAnswer && (
            <div key={ans.id} className='possibleAnsWrapper' onClick={() => handleAnswer(ans.content, userData.image)}>
              <p className='possibleAnswers'>{ans.content}</p>
            </div>
          ))
      })}
      {currentAnswer && (
        <div className='answerWrapper'>
          <div className='answer'>
            <img src={userData?.image || avatar} alt="user image" className='chatSenderImage' />
            {currentAnswer}
          </div>
        </div>
      )}
    </>
  );
};

export default AnswersMsg;
