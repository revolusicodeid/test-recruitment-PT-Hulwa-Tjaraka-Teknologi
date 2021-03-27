import React, { createContext, useState } from "react";

const ProgressContext = createContext();

const ProgressProvider = ({ children }) => {
  const initProgress = 0;
  const [progress, setProgress] = useState(initProgress);
  const [showProgress, setShowProgress] = useState(false);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        showProgress,
        setProgress,
        setShowProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export {ProgressContext, ProgressProvider}