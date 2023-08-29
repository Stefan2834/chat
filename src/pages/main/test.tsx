import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const startLoadTime = window.performance.timing.navigationStart;
    const pageLoadTime = window.performance.timing.loadEventEnd - startLoadTime;

    const intervalId = setInterval(() => {
      const currentTime = Date.now() - startLoadTime;
      const currentProgress = (100 * currentTime) / pageLoadTime;
      setLoadingProgress(Math.min(currentProgress, 100));

      if (currentTime >= pageLoadTime) {
        clearInterval(intervalId);
        setLoadingProgress(100);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div className="progress-bar" style={{ width: `${loadingProgress}%`, height:'30px', backgroundColor:'red' }} />;
};

export default ProgressBar;