interface FileType {
  [key: string]: {
    uuid: string;
    id: string
    language: string;
    code: string;
  }
}

interface FolderType {
    [key: string]: FileType;
}