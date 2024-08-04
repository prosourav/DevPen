import { ExportType } from "../screens/playground/types";


export const handleExport = (value: string, file: string) => {
  if (value) {
    const data: ExportType = {
      code: value.toString(),
      file: file,
    };
    return data;
  }
};