export function readFileContent(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read file content as string'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
