import { lang, LanguageCode } from "../constants";
import uuid from "short-uuid";

interface ParmeterType {
  data: Record<string, string>;
  folders: FolderType;
  pointer?: string,
}

export const createDirectory = ({ data, folders, pointer = '' }: ParmeterType) => {
  const { language, folder, file } = data;
  const languageKey = language as LanguageCode;

  const payloadValue = {
    [file]: {
      uuid: `${folder ?? pointer}_${file}`,
      id: uuid.generate(),
      language: language,
      code: lang[languageKey].code,
    },
  };
  return pointer ? { ...folders, [pointer]: { ...folders[pointer], ...payloadValue } } : { ...folders, [folder]: payloadValue };

};
