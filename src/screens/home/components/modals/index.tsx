import { useContext } from 'react';
import { ModalContext } from '../../../../data/modal-provider';
import CreatePlayGroundModal from './CreatePlayGround';
import CreateFileModal from './CreateFile';
import CreateFolderModal from './CreateFolder';

const Modal = () => {

  const modalFeatures = useContext(ModalContext);

  return (
    <>
      {
        modalFeatures.activateModal === 'create' && <CreatePlayGroundModal isModalOpen={true} closeModal={modalFeatures.closeModal} />
      }
      {
        modalFeatures.activateModal === 'create-file' && <CreateFileModal isModalOpen={true} closeModal={modalFeatures.closeModal} />
      }
      {
        modalFeatures.activateModal === 'create-folder' && <CreateFolderModal isModalOpen={true} closeModal={modalFeatures.closeModal} />
      }
    </>
  );
};

export default Modal;