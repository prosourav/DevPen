/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";
import storage from "../utils/storage";
import { initialData } from "../constants";

interface PlaygroundProps {
  children: React.ReactNode;
}

export const PlaygroundContext = createContext({});

const PlayGroundProvider = ({ children }: PlaygroundProps) => {
  const [folders, setFolders] = useState<FolderType>(() =>
    storage.retrieve<FolderType>('folders') || { ...initialData }
  );

  useEffect(() => {
    storage.save<FolderType>('playground', initialData)
  }, []);


  return (
    <PlaygroundContext.Provider value={folders} >
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlayGroundProvider;