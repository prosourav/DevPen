/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useMemo, useState } from "react";
import storage from "../utils/storage";
import { initialData } from "../constants";

interface FileType {
  [key: string]: {
    uuid: string;
    language: string;
    code: string;
  }
}

interface FolderType {
  [key: string]: FileType;
}

interface PlaygroundContextType {
  folders: FolderType;
  updateFolders: (folders: FolderType) => void;
}

interface PlaygroundProps {
  children: React.ReactNode;
}

export const PlaygroundContext = createContext<PlaygroundContextType>({
  folders: {},
  updateFolders: () => { },
});

const PlayGroundProvider: React.FC<PlaygroundProps> = ({ children }) => {
  const [folders, setFolders] = useState<FolderType>(() => {
    try {
      return storage.retrieve<FolderType>('playground') || { ...initialData };
    } catch (error) {
      console.error("Failed to retrieve folders from storage:", error);
      return { ...initialData };
    }
  });

  useEffect(() => {
    try {
      storage.save<FolderType>('playground', folders);
    } catch (error) {
      console.error("Failed to save folders to storage:", error);
    }
  }, [folders]);

  const playgroundProviderFeatures = useMemo(() => ({
    folders,
    updateFolders: setFolders,
  }), [folders]);

  return (
    <PlaygroundContext.Provider value={playgroundProviderFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlayGroundProvider;
