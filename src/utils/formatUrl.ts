
export interface File {
  uuid: string;
  languages?: string;
  code: string;
}

export type FolderType = Record<string, Record<string, File>>;

export interface ReturnTypeGetInfo {
  file: File;
  folder: string;
  fileName: string;
  
}
export const encodeUrl = (data: string): string => {  
  return data.toLowerCase().replace(/\s+/g, '');
};

export const decodeUrl = (data: string): { folder: string; encodedFileName: string } => {
  const [folder, file] = data.split('_');
  return {
    folder: `${folder.charAt(0).toUpperCase()}${folder.slice(1)}`,
    encodedFileName: file
  };
};

export const getDirInfo = (encodedData: string, folders: FolderType): ReturnTypeGetInfo | null => {
  const { folder, encodedFileName } = decodeUrl(encodedData);

  if (!folders[folder]) {
    return null; // or throw an error if the folder doesn't exist
  }

  const fileName = Object.keys(folders[folder]).find(name =>
    encodeUrl(name) === encodedFileName
  );

  return fileName ? { folder, fileName, file: folders[folder][fileName] } : null;
};
