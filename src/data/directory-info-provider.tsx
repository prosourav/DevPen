import { createContext, useState, ReactNode, FC } from "react";

interface DirectoryContextType {
  pointer: string;
  dirInfo: DirInfoType | undefined;
  updatePointer: (pointer: string) => void;
  updateDirInfo: (info: DirInfoType) => void;
}

export const DirectoryContext = createContext<DirectoryContextType>({
  pointer: '',
  dirInfo: undefined,
  updatePointer: () => { },
  updateDirInfo: () => { },
});

interface DirectoryProviderProps {
  children: ReactNode;
}

interface DirInfoType {
  language: string;
  title: string;
}

const DirectoryInfoProvider: FC<DirectoryProviderProps> = ({ children }) => {
  const [pointer, setPointer] = useState<string>('');
  const [dirInfo, setDirInfo] = useState<DirInfoType | undefined>(undefined);

  const directoryFeatures = {
    pointer,
    dirInfo,
    updatePointer: setPointer,
    updateDirInfo: setDirInfo,
  };

  return (
    <DirectoryContext.Provider value={directoryFeatures}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryInfoProvider;
