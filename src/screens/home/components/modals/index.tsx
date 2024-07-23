import { useContext } from 'react';
import { ModalContext } from '../../../../data/modal-provider';
import CreatePlayGroundModal from './CreatePlayGround';
import CreateFileModal from './CreateFile';
import CreateFolderModal from './CreateFolder';
import DeleteConfirm from './DeleteConfirmation';
import EditModal from './Edit';
// import { DirectoryContext } from '../../../../data/directory-info-provider';

interface ModalProps {
  createPlayGround: (data: Record<string, string>) => void,
  createFolder: (data: Record<string, string>) => void,
  createFile: (data: Record<string, string>) => void,
  deleteItem: () => void
  info: string,
}

const Modal = ({ createPlayGround, createFolder, createFile, deleteItem, info }: ModalProps) => {
  const modalFeatures = useContext(ModalContext);

  return (
    <>
      {
        modalFeatures.activateModal === 'create' && <CreatePlayGroundModal isModalOpen={true}
          closeModal={modalFeatures.closeModal} createPlayGround={createPlayGround} />
      }
      {
        modalFeatures.activateModal === 'create-file' && <CreateFileModal isModalOpen={true}
          closeModal={modalFeatures.closeModal} createFile={createFile} />
      }
      {
        modalFeatures.activateModal === 'create-folder' && <CreateFolderModal isModalOpen={true}
          closeModal={modalFeatures.closeModal} createFolder={createFolder} />
      }
      {modalFeatures.activateModal === 'edit' && (
        <EditModal
          isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          // deleteOperation={deleteItem}
          info={info}
        />
      )}

      {modalFeatures.activateModal === 'delete' && (
        <DeleteConfirm
          isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          deleteOperation={deleteItem}
          info={info}
        />
      )}
    </>
  );
};

export default Modal;