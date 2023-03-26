import React, { useState } from "react";
import { LoadingContext, LoadingContextType } from "./context";
import Loading from "./index";

const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetIsLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const value: LoadingContextType = {
    isLoading,
    setIsLoading: handleSetIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Loading />
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
