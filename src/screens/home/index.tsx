/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.scss';
import PlayGround from '../../../public/assets/code.png';
import { useContext, lazy, Suspense } from 'react';
import { PlaygroundContext } from '../../provider/playground-provider';
import { createPortal } from 'react-dom';
import Modal from '../../components/modals';
import { ModalContext } from '../../provider/modal-provider';
import { DirectoryContext } from '../../provider/directory-info-provider';
import { createDirectory } from '../../utils/createDirectory';
import { updateBasicsUuid } from '../../utils/transformUuid';
import useModal from '../../hooks/useModal';
const Folder = lazy(() => import('./components/folder'));


function Home() {
  const { modalContainer } = useModal()
  const { folders, updateFolders } = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);
  const { pointer } = useContext(DirectoryContext);

  const handleOpen = () => modalFeatures.openModal('create');
  const handleFolder = () => modalFeatures.openModal('create-folder');

  const deleteItem = () => {
    if (pointer.includes('_')) {
      const [folderKey, file] = pointer.split('_')
      const clonedFolders = { ...folders };
      const selectedFolder = clonedFolders[folderKey];

      delete selectedFolder[file];
      return updateFolders(clonedFolders);
    }
    const clonedFolders = { ...folders };
    delete clonedFolders[pointer];
    return updateFolders(clonedFolders);
  };


  const editItem = (newTitle: string, success: (isTrue: boolean) => void) => {
    if (pointer.includes('_')) {
      const [folderKey, file] = pointer.split('_');
      if (folders[folderKey][newTitle]) {
        return success(false);
      }
      const clonedFolders = { ...folders };
      let newObj = clonedFolders[folderKey][file];

      delete clonedFolders[folderKey][file];
      newObj = { ...newObj, ['uuid']: `${folderKey}_${newTitle}` };
      clonedFolders[folderKey][newTitle] = newObj;
      updateFolders(clonedFolders);
      return success(true);
    }

    if (folders[newTitle]) {
      return success(false)
    }
    const updatedData = updateBasicsUuid(newTitle, (folders as FolderType)[pointer]);
    delete folders[pointer];
    updateFolders({ ...updatedData, ...folders });
    return success(true);
  };

  const createPlayGround = (data: Record<string, string>, success: (isTrue: boolean) => void) => {
    if (folders[data.folder]) {
      return success(false)
    }
    const updatedData = createDirectory({ data, folders: folders as FolderType });
    updateFolders(updatedData);
    return success(true);
  };

  const createFolder = (data: Record<string, string>, success: (isTrue: boolean) => void) => {
    if (folders[data.file]) {
      return success(false)
    }
    updateFolders({ ...folders, [data.file]: {} });
    return success(true);
  };

  const createFile = (data: Record<string, string>, success: (isTrue: boolean) => void) => {
    if (folders[pointer][data.file]) {
      return success(false)
    }
    const updatedData = createDirectory({ data, folders: folders as FolderType, pointer });
    updateFolders(updatedData);
    return success(true);

  };

  return (
    <>
      {modalContainer && createPortal(
        <Modal {...{ createPlayGround, createFolder, createFile, deleteItem, editItem }} />, modalContainer
      )}
      <div className="container">
        <div className="col-1">
          <img src={PlayGround} alt="Playgroundx" height={250} width={250} loading="lazy" />
          <h1 className='title'>DEVPEN</h1>
          <span>Code. Compile. Debug</span>
          <button className='btn bg-white' onClick={handleOpen}>
            <span className="material-icons">add</span>
            Create New Playground
          </button>
        </div>

        <div className="col-2">
          <div className='new-playground'>
            <span className='playground-title'>
              My <strong>Playground</strong>
            </span>
            <span className='add' onClick={handleFolder}>
              <span className="material-icons">add</span>
              Create Folder
            </span>
          </div>

          <div className='folders-listing'>
            <Suspense fallback={<div>Loading...</div>}>
              {
                Object.entries(folders).map(([folderName, files]) => (
                  <Folder key={folderName} folderName={folderName} items={files as FileType} />
                ))
              }
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
