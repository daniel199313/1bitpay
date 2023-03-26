import { createContext, useContext } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = (): LoadingContextType => useContext(LoadingContext);
