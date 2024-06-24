import avatar from '../../assets/images/navbar/userpick.png'

const AnswersMsg = ({ selectedMessage, answer, setAnswer, selectedMessagePreview }) => {
  return (
    <>
      {selectedMessage?.responses.map(ans => (
        !answer && (
          <div className='possibleAnsWrapper' onClick={() => setAnswer(`${ans.content}`)}>
            <p className='possibleAnswers'>{ans.content}</p>
          </div>)
      ))}
      {answer ?
        <div className='answerWrapper'>
          <div className='answer'>
            <img src={avatar} alt="" />
            {answer ? `${answer}` : ''}
          </div>
        </div> : ''
      }
    </>
  )
}

export default AnswersMsg