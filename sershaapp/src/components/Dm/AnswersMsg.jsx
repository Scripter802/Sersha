import React from 'react'

const AnswersMsg = ({ messages, message, answer, setAnswer }) => {
  return (
    <>
        {messages.map(msg => (
            message === msg.name && !answer ? msg.answer?.map(ans => (
              <div className='possibleAnsWrapper' onClick={() => setAnswer(`${ans}`)}>
                <p className='possibleAnswers'>{ans}</p>
              </div>
            )) : ``
            ))}
            {answer ?
            <div className='answerWrapper'>
              <div className='answer'>
                <img src={messages[0].avatar} alt="" />
                {answer ? `${answer}` : ''}
              </div>
            </div> : ''
            }
    </>
  )
}

export default AnswersMsg