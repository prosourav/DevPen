import React, { createContext, useState, ReactNode } from "react";

interface DirectoryContextType {
  pointer: string;
  updatePointer: (pointer: string) => void;
}

export const DirectoryContext = createContext<DirectoryContextType>(
  {
    pointer: '',
    updatePointer: () => { },
  }
);

interface DirectoryProviderProps {
  children: ReactNode;
}

const DirectoryInfoProvider: React.FC<DirectoryProviderProps> = ({ children }) => {
  const [pointer, setPointer] = useState<string>('');

  const directoryFeatures = {
    pointer,
    updatePointer: setPointer
  };

  return (
    <DirectoryContext.Provider value={directoryFeatures}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryInfoProvider;