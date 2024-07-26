export const encodeUrl = (data: string) => {
  return data.toLowerCase().replace(/\s+/g, '');
};

export const decodeUrl = (data: string) => {
  const [folder, file] = data.split('_');
  return {
    folder: `${folder.charAt(0).toUpperCase()}${folder.slice(1)}`,
    encodedFileName: file
  };
};

export const getFileInfo = (encodedData: string, folders: FolderType) => {
  const { folder, encodedFileName } = decodeUrl(encodedData);

  if (!folders[folder]) {
    return null; // or throw an error if the folder doesn't exist
  }

  const fileName = Object.keys(folders[folder]).find(name =>
    encodeUrl(name) === encodedFileName
  );

  return fileName ? { folder, fileName } : null;
};