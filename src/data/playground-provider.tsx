import { createContext, useEffect, useMemo, useState } from "react";
import storage from "../utils/storage";
import { initialData } from "../constants";

interface FileType {
  uuid: string;
  id: string;
  language: string;
  code: string;
}

export interface FolderType {
  [key: string]: FileType;
}

export interface PlaygroundContextType {
  folders: Record<string, FolderType>;
  updateFolders: (folders: Record<string, FolderType>) => void;
}

interface PlaygroundProps {
  children: React.ReactNode;
}

const defaultContext: PlaygroundContextType = {
  folders: {},
  updateFolders: () => { },
};

export const PlaygroundContext = createContext<PlaygroundContextType>(defaultContext);

const PlayGroundProvider: React.FC<PlaygroundProps> = ({ children }) => {
  const [folders, setFolders] = useState<Record<string, FolderType>>(() => {
    try {
      return storage.retrieve<Record<string, FolderType>>('playground') || initialData;
    } catch (error) {
      console.error("Failed to retrieve folders from storage:", error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      storage.save('playground', folders);
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
