interface ThemeProps {
  children: React.ReactElement;
}

export interface ThemeContextProps {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

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

type ModalType = string | null;

export interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  activateModal: ModalType;
}

interface ModalProviderProps {
  children: ReactNode;
}

export interface InputOutputDataType {
  input: string;
  output: string;
}

export interface InputOutputFeatures {
  data: InputOutputDataType;
  updateData: (value: InputOutputDataType) => void;
}


interface DirectoryContextType {
  pointer: string;
  dirInfo: DirInfoType | undefined;
  updatePointer: (pointer: string) => void;
  updateDirInfo: (info: DirInfoType) => void;
}

interface DirectoryProviderProps {
  children: ReactNode;
}

interface DirInfoType {
  language: string;
  title: string;
}