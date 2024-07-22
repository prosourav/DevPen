interface FileType {
  uuid: string;
  language: string;
  code: string;
}

interface FolderType {
  [key: string]: {
    [key: string]: FileType;
  };
}