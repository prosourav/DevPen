
export function updateBasicsUuid(newPrefix: string, basics: FileType): FolderType {
  const updatedFiles: FileType = {};

  for (const [key, value] of Object.entries(basics)) {
    updatedFiles[key] = {
      ...value,
      uuid: `${newPrefix}_${key}`
    };
  }

  return { [newPrefix]: updatedFiles };
}