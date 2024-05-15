

const AnswersMsg = ({ selectedMessage, answer, setAnswer, selectedMessagePreview }) => {
  return (
    <>
        {selectedMessage?.answer.map(ans => (
          !answer && (
              <div className='possibleAnsWrapper' onClick={() => setAnswer(`${ans}`)}>
                <p className='possibleAnswers'>{ans}</p>
              </div> )
            ))}
            {answer ?
            <div className='answerWrapper'>
              <div className='answer'>
                <img src={selectedMessage?.avatar} alt="" />
                {answer ? `${answer}` : ''}
              </div>
            </div> : ''
            }
    </>
  )
}

export default AnswersMsg