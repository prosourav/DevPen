import './index.scss';
import PlayGround from '../../assets/code.png';
import Folder from './components/folder';
import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../data/playground-provider';
import { createPortal } from 'react-dom';
import Modal from './components/modals';
import { ModalContext } from '../../data/modal-provider';


function Home() {
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null);
  const folders = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);

  useEffect(() => {
    setModalContainer(document.getElementById('modals'));
  }, []);

  const handleOpen = () => modalFeatures.openModal('create');
  const handleFolder = () => modalFeatures.openModal('create-folder');

  return (
    <>
      {modalContainer && createPortal(
        <Modal />, modalContainer
      )}
      <div className="container">
        <div className="col-1">
          <img src={PlayGround} alt="Playground" height={250} width={250} />
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

          {
            Object.entries(folders).map(([folderName, files]) => (
              <Folder key={folderName} folderName={folderName} items={files as FileType} />
            ))
          }
        </div>
      </div>
    </>

  );
}

export default Home;
