import { createContext, useState, FC } from "react";
import { DirectoryContextType, DirectoryProviderProps, DirInfoType } from "./types";

export const DirectoryContext = createContext<DirectoryContextType>({
  pointer: '',
  dirInfo: undefined,
  updatePointer: () => { },
  updateDirInfo: () => { },
});



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
