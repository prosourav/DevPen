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