
export type Language = 'python' | 'c++' | 'java' | 'js';


interface NavChildren {
  isFullscreen: boolean;
}

export interface FileT {
  uuid: string;
  code: string;
  language: string;
  id: string;
}

export interface CurrentFolderType {
  folderName: string;
  fileName: string;
  file: FileT;
}

interface LanCodeType {
  [key: string]: number;
}


interface OperationProps {
  operationId: 'import' | 'export';
  label: string;
  operation?: (e?: React.ChangeEvent<HTMLInputElement>) => ExportType | void;
  importData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


interface HeaderProps {
  folders: Record<string, Record<string, FileT>>;
  fileInfo: CurrentFolderType;
  updateFolders: (data: Record<string, Record<string, FileT>>) => void;
  edit: (e: React.MouseEvent<HTMLSpanElement>) => void;
  handleLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleThemeChange: (data: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveCode: (data: Dispatch<SetStateAction<loadingType>>) => void
  editorTheme: theme
}
export type loadingType = 'true' | 'false' | 'in-progress'


interface EditorProps {
  language: 'python' | 'c++' | 'java' | 'js';
  code: string;
  onChange?: (value: string) => void;
  editorTheme: theme;
  codeRef: MutableRefObject<ReactCodeMirrorRef | null>;
}

interface FooterProps {
  handleExport: () => ExportType | undefined;
  handleImport: (e?: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (setDisabled: React.Dispatch<SetStateAction<boolean>>) => void;
}

export interface ExportType {
  code: string;
  file: string;
}
