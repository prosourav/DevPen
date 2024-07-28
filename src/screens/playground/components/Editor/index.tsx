import React, { useContext, useMemo, ChangeEvent, useRef } from "react";
import Footer, { ExportType } from "./Footer";
import EditorElement from "./Editor";
import { useParams } from "react-router-dom";
import Header, { loadingType } from "./Header";
import { PlaygroundContextType, PlaygroundContext } from "../../../../data/playground-provider";
import { encodeUrl } from "../../../../utils/formatUrl";
import { DirectoryContext } from "../../../../data/directory-info-provider";
import { ModalContext } from "../../../../data/modal-provider";
import useModal from "../../../../hooks/useModal";
import { createPortal } from "react-dom";
import Modal from "../../../home/components/modals";
import { lang, langT, theme } from "../../../../constants";
import { ThemeContext, ThemeContextProps } from "../../../../data/playground-theme-provider";
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';

export interface FileT {
  uuid: string;
  code: string;
  language: string;
  id: string;
}

export interface CurrentFolderType {
  folderName: string;
  fileName: string;
  file: FileT;
}

export type Language = 'python' | 'c++' | 'java' | 'js';

const CodeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fileKey, encodedFolderKey] = (id as string).split("_");
  const { folders, updateFolders } = useContext<PlaygroundContextType>(PlaygroundContext);
  const playGroundTheme = useContext<ThemeContextProps | undefined>(ThemeContext);
  const { updatePointer } = useContext(DirectoryContext);
  const { modalContainer } = useModal();
  const modalFeatures = useContext(ModalContext);
  const codeRef = useRef<ReactCodeMirrorRef | null>(null);

  const fileInfo = useMemo(() => {
    return Object.keys(folders).reduce((acc, folderKey): CurrentFolderType => {
      if (encodeUrl(folderKey) === encodedFolderKey) {
        acc.folderName = folderKey;
        Object.keys(folders[folderKey]).forEach(fileItem => {
          if (folders[folderKey][fileItem]['id'] === fileKey) {
            acc.fileName = fileItem;
            acc.file = folders[folderKey][fileItem];
          }
        });
      }
      return acc;
    }, {} as CurrentFolderType);
  }, [folders, fileKey, encodedFolderKey]);

  const edit = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    modalFeatures.openModal('edit');
    if (fileInfo) {
      updatePointer(fileInfo.file.uuid);
    }
  };

  const editItem = (newTitle: string, success: (isTrue: boolean) => void) => {
    if (!fileInfo) return success(false);

    const { folderName: folderKey, fileName: fileKey } = fileInfo;

    if (folders[folderKey][newTitle]) {
      return success(false);
    }
    const clonedFolders = { ...folders };
    const newObj = { ...clonedFolders[folderKey][fileKey], uuid: `${folderKey}_${newTitle}` };

    delete clonedFolders[folderKey][fileKey];
    clonedFolders[folderKey][newTitle] = newObj;
    updateFolders(clonedFolders);
    return success(true);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { folderName: folderKey, fileName: fileKey, file } = fileInfo;

    const clonedFolders = { ...folders };
    const newObj = { ...file, ['language']: event.target.value, ['code']: lang[event.target.value as Language].code };
    clonedFolders[folderKey][fileKey] = newObj;
    updateFolders(clonedFolders);
  };

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (playGroundTheme?.updateTheme) {
      playGroundTheme?.updateTheme(event.target.value as theme);
    }
  };

  const handleSaveCode = (cb: (data: loadingType) => void) => {
    if (codeRef.current?.view) {
      const code = codeRef.current.view.state.doc.toString();
      const { folderName: folderKey, fileName: fileKey, file } = fileInfo;

      const clonedFolders = { ...folders };
      const newObj = { ...file, ['code']: code }
      clonedFolders[folderKey][fileKey] = newObj;
      updateFolders(clonedFolders);
      setTimeout(() => (cb('in-progress')), 700)
    }
  };

  const handleExport = () => {
    if (codeRef.current?.view) {
      const languageToExtension = {
        js: ".js",
        java: ".java",
        "c++": ".cpp",
        python: ".py",
      };

      const file = `${fileInfo.fileName}${languageToExtension[fileInfo.file.language as langT] || ""}`;
      const data: ExportType = {
        code: codeRef.current.view.state.doc.toString(),
        file: file,
      };
      return data
    }
  };



  const getFile = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target?.files && e.target.files.length > 0) {
      placeFileContent(e.target.files[0]);
    }
  };

  const placeFileContent = (file: File) => {
    readFileContent(file)
      .then((content) => {
        if (codeRef.current?.view) {
          codeRef.current.view.dispatch({
            changes: { from: 0, to: codeRef.current.view.state.doc.length, insert: content }
          });
        }
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file: File): Promise<string> {
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

  return (
    <div>
      {modalContainer && createPortal(
        <Modal editItem={editItem} />, modalContainer
      )}
      <Header
        folders={folders}
        fileInfo={fileInfo}
        updateFolders={updateFolders}
        edit={edit}
        editorTheme={playGroundTheme?.theme as theme}
        handleLanguageChange={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        handleSaveCode={handleSaveCode}
      />
      <EditorElement
        codeRef={codeRef}
        language={fileInfo.file.language as Language}
        code={fileInfo.file.code}
        editorTheme={playGroundTheme?.theme as theme}
      />
      <Footer
       handleExport={handleExport} handleImport={getFile} />
    </div>
  );
};

export default CodeEditor;