import './index.scss';
import PlayGround from '../../assets/code.png';
import Folder from './components/folder';
import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../data/playground-provider';
import { createPortal } from 'react-dom';
import Modal from './components/modals';
import { ModalContext } from '../../data/modal-provider';
import { DirectoryContext } from '../../data/directory-info-provider';
import { createDirectory } from '../../utils/createDirectory';


interface FileType {
  [key: string]: {
    uuid: string;
    language: string;
    code: string;
  }
}

interface FolderType {
  [key: string]: FileType;
}

interface PlaygroundContextType {
  folders: FolderType;
  updateFolders: (folders: FolderType) => void;
}


function Home() {
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null);
  const { folders, updateFolders } = useContext<PlaygroundContextType>(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);
  const { pointer } = useContext(DirectoryContext);



  useEffect(() => {
    setModalContainer(document.getElementById('modals'));
  }, []);

  const handleOpen = () => modalFeatures.openModal('create');
  const handleFolder = () => modalFeatures.openModal('create-folder');

  const createPlayGround = (data: Record<string, string>) => {
    const updatedData = createDirectory({ data, folders });
    updateFolders(updatedData);
  };

  const createFolder = (data: Record<string, string>) => {
    updateFolders({ ...folders, [data.file]: {} });
  };

  const createFile = (data: Record<string, string>) => {
    const updatedData = createDirectory({ data, folders, pointer });
    updateFolders(updatedData);
  };

  return (
    <>
      {modalContainer && createPortal(
        <Modal {...{ createPlayGround, createFolder, createFile }} />, modalContainer
      )}
      <div className="container">
        <div className="col-1">
          <img src={PlayGround} alt="Playgroundx" height={250} width={250} />
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
            {
              Object.entries(folders).map(([folderName, files]) => (
                <Folder key={folderName} folderName={folderName} items={files} />
              ))
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;