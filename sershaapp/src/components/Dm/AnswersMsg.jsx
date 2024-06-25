
import avatar from '../../assets/images/navbar/userpick.png';

const AnswersMsg = ({ selectedMessage, currentAnswer, handleAnswer }) => {
  return (
    <>
      {selectedMessage?.responses?.map(ans => (
        !currentAnswer && (
          <div key={ans.id} className='possibleAnsWrapper' onClick={() => handleAnswer(ans.content)}>
            <p className='possibleAnswers'>{ans.content}</p>
          </div>
        )
      ))}
      {currentAnswer && (
        <div className='answerWrapper'>
          <div className='answer'>
            <img src={avatar} alt="" />
            {currentAnswer}
          </div>
        </div>
      )}
    </>
  );
};

export default AnswersMsg;
