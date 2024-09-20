import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import Joyride from 'react-joyride';
import './tutorial.css';

const Tutorial = () => {
  const { tutorial, setTutorial, setIsTutorialActive } = useGlobalContext();
  const [tutorialStarted, setTutorialStarted] = useState(false);

  const handleTutorialStart = () => {
    setTutorialStarted(true);
    setTutorial({ ...tutorial, run: true });
  };

  useEffect(() => {
    handleTutorialStart();
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, lifecycle } = data;
    if (status === 'finished' || status === 'skipped') {
      setTutorial({ ...tutorial, run: false });
      setTutorialStarted(false);
      setIsTutorialActive(false)
    }
  };

  return (
    <div className="tutorial-wrapper">
      {tutorialStarted && (
        <>
          <Joyride
            continuous
            run={tutorial.run}
            scrollToFirstStep
            showProgress
            showSkipButton
            steps={tutorial.steps}
            hideCloseButton
            styles={{
              options: {
                zIndex: 10000,
                backgroundColor: '#CE3D21',
                textColor: '#FFF',
                spotlightPadding: 20,
              },
              buttonBack: {
                color: '#FFF',
              },

              spotlight: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              },
            }}
            callback={handleJoyrideCallback}

          />
          <div className="tutorial-overlay"></div>
        </>
      )}
    </div>
  );
};

export default Tutorial;
