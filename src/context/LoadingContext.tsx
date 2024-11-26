"use client";
import { IS_LOADING } from "@/utils/constants";
import React, { createContext, useContext, useRef, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const refIsLoading = useRef(0);
  const [isLoading, setIsLoading] = useState(0);

  const setLoading = (loading: boolean) => {
    refIsLoading.current = !!loading
      ? +refIsLoading.current + IS_LOADING.LOADING
      : +refIsLoading.current + IS_LOADING.LOADED;

    setIsLoading(
      !!loading
        ? +refIsLoading.current + IS_LOADING.LOADING
        : +refIsLoading.current + IS_LOADING.LOADED
    );
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading: isLoading > IS_LOADING.ALL_LOADED,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
