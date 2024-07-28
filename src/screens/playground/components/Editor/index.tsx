import React, { useContext, useMemo, ChangeEvent, useRef } from "react";
import Footer from "./Footer";
import EditorElement from "./Editor";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { PlaygroundContextType, PlaygroundContext } from "../../../../data/playground-provider";
import { encodeUrl } from "../../../../utils/formatUrl";
import { DirectoryContext } from "../../../../data/directory-info-provider";
import { ModalContext } from "../../../../data/modal-provider";
import useModal from "../../../../hooks/useModal";
import { createPortal } from "react-dom";
import Modal from "../../../home/components/modals";
import { lang, theme } from "../../../../constants";
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

  const handleSaveCode = () => {
    if (codeRef.current?.view) {
      const code = codeRef.current.view.state.doc.toString();
      const { folderName: folderKey, fileName: fileKey, file } = fileInfo;

      const clonedFolders = { ...folders };
      const newObj = { ...file, ['code']: code }
      clonedFolders[folderKey][fileKey] = newObj;
      return updateFolders(clonedFolders);
    }
  };

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
      <Footer />
    </div>
  );
};

export default CodeEditor;
