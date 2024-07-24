import { FolderType, FileType } from "../screens/home";

export function updateBasicsUuid(newPrefix: string, basics: FileType): FolderType {
  const updatedBasics: FileType = {};

  for (const [key, value] of Object.entries(basics)) {
    updatedBasics[key] = {
      ...value,
      uuid: `${newPrefix}-${key}`
    };
  }

  return { [newPrefix]: updatedBasics };
}