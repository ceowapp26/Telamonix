'use client';
import React, { createContext, useContext, useState } from 'react';

interface GeneralContextType {
  contextContent: string;
  setContextContent: React.Dispatch<React.SetStateAction<string>>;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [contextContent, setContextContent] = useState<string>(undefined);
  
  return (
    <GeneralContext.Provider value={{ 
      contextContent, setContextContent,
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a ContextProvider');
  }
  return context;
};

