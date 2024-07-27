import React, { useContext, useMemo } from 'react';
import { PlaygroundContext, PlaygroundContextType } from '../../../../data/playground-provider';
import { useParams } from 'react-router-dom';
import { encodeUrl } from '../../../../utils/formatUrl';
import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';
import { createPortal } from 'react-dom';
import Modal from '../../../home/components/modals';
import { DirectoryContext } from '../../../../data/directory-info-provider';
import { ModalContext } from '../../../../data/modal-provider';

interface FileT {
  uuid: string;
  code: string;
  language: string;
  id: string;
}

interface CurrentFolderType {
  folderName: string;
  fileName: string;
  file: FileT;
}

// interface PlayGroundType{
//   language: string;
//   theme: string;
// }

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { modalContainer } = useModal();
  const { folders, updateFolders } = useContext<PlaygroundContextType>(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);
  const { updatePointer } = useContext(DirectoryContext);
  // const [playGroundOptions, setPlaygroundOptions] = useState<PlayGroundType>();

  const [fileKey, encodedFolderKey] = (id as string).split("_");

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

  const edit = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    modalFeatures.openModal('edit');
    if (fileInfo) {
      updatePointer(fileInfo.file.uuid);
    }
  };

  return (
    <>
      {modalContainer && createPortal(
        <Modal editItem={editItem} />, modalContainer
      )}
      <div>
        <div className="header-bar">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <h2 className="header-title">
              File: <span style={{ fontWeight: 400 }}>{fileInfo?.fileName}</span>
            </h2>
            <span className="material-icons icon folder-icon header-icon" onClick={edit}>
              edit
            </span>
            <button className="header-button">Save</button>
          </div>

          <div className="header-controls">
            <select
              className="header-select"
              name="language"
              defaultValue={fileInfo?.file?.language}
              onChange={() => console.log("Language changed!")}
              required
            >
              {languages.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="header-select"
              name="theme"
              defaultValue="green"
              onChange={() => console.log("Theme changed!")}
              required
            >
              <option value="green">green</option>
              <option value="blue">blue</option>
            </select>
          </div>
        </div>
        <div style={{ background: 'yellow', height: '73vh' }}></div>
      </div>
    </>
  );
};

export default Editor;