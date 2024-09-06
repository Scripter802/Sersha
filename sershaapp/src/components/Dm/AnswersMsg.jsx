import avatar from '../../assets/images/navbar/userpick.png';
import { useGlobalContext } from '../../context/context';


const AnswersMsg = ({ selectedMessage, currentAnswer, handleAnswer }) => {
  const userData = localStorage.getItem('userData');
  const { baseUrlImage, user, setUser } = useGlobalContext();

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
            <img src={userData?.image ? `${baseUrlImage}${userData?.image}` : avatar} alt="" />
            {currentAnswer}
          </div>
        </div>
      )}
    </>
  );
};

export default AnswersMsg;
