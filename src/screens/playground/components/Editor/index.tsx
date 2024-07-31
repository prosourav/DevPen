import React, { useContext, useMemo, ChangeEvent, useRef, SetStateAction } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { PlaygroundContext } from "../../../../provider/playground-provider";
import { encodeUrl } from "../../../../utils/formatUrl";
import { DirectoryContext } from "../../../../provider/directory-info-provider";
import { ModalContext } from "../../../../provider/modal-provider";
import useModal from "../../../../hooks/useModal";
import { createPortal } from "react-dom";
import Modal from "../../../../components/modals";
import { lang, langT, languageCode, languageToExtension, theme } from "../../../../constants";
import { ThemeContext } from "../../../../provider/playground-theme-provider";
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { BodyType, handleSubmit } from "../../../../api";
import { InputOutputContext } from "../../../../provider/input-output-provider";
import { encode } from "../../../../utils/encode";
import { handleExport } from "../../../../utils/handleExport";
import { readFileContent } from "../../../../utils/readFile";
import { CurrentFolderType, ExportType, LanCodeType, Language, loadingType } from "../../types";
import { PlaygroundContextType, ThemeContextProps } from "../../../../provider/types";
import EditorElement from "./Editor";



const CodeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fileKey, encodedFolderKey] = (id as string).split("_");
  const { folders, updateFolders } = useContext<PlaygroundContextType>(PlaygroundContext);
  const playGroundTheme = useContext<ThemeContextProps | undefined>(ThemeContext);
  const { updatePointer } = useContext(DirectoryContext);
  const { modalContainer } = useModal();
  const modalFeatures = useContext(ModalContext);
  const codeRef = useRef<ReactCodeMirrorRef | null>(null);
  const { data: ContextData, updateData } = useContext(InputOutputContext);


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

  // open edit modal
  const edit = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    modalFeatures.openModal('edit');
    if (fileInfo) {
      updatePointer(fileInfo.file.uuid);
    }
  };

  // edit operation
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

  const exportData = () => {
    if (codeRef.current?.view) {
      const code = codeRef.current.view.state.doc.toString();
      const file = `${fileInfo.fileName}${languageToExtension[fileInfo.file.language as langT] || "txt"}`;
      return handleExport(code, file)
    }
  };

  const importData = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target?.files && e.target.files.length > 0) {
      readFileContent(e.target.files[0]).then((content) => {
        if (codeRef.current?.view) {
          codeRef.current.view.dispatch({
            changes: { from: 0, to: codeRef.current.view.state.doc.length, insert: content }
          });
        }
      })
        .catch((error) => console.log(error));
    }
  };

  async function runTheCode(cb: React.Dispatch<SetStateAction<boolean>>) {
    updateData({ ...ContextData, ["output"]: '' });

    if (codeRef.current?.view) {
      const data: BodyType = {
        source_code: encode(codeRef.current.view.state.doc.toString()),
        language_id: (languageCode as LanCodeType)[fileInfo.file?.language],
        stdin: encode(ContextData.input)
      }
      const response = await handleSubmit(data);
      updateData({ ...ContextData, ["output"]: (response as { output: string }).output });
      cb(false)
    }
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
        handleExport={exportData as () => ExportType} handleImport={importData}
        handleSubmit={runTheCode}
      />
    </div>
  );
};

export default CodeEditor;