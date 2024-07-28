import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../../data/modal-provider';
import CreatePlayGroundModal from './CreatePlayGround';
import CreateFileModal from './CreateFile';
import CreateFolderModal from './CreateFolder';
import DeleteConfirm from './DeleteConfirmation';
import EditModal from './Edit';
import { DirectoryContext } from '../../../../data/directory-info-provider';

interface ModalProps {
  createPlayGround?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  createFolder?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  createFile?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  deleteItem?: () => void
  editItem: (data: string, success: (isTrue: boolean) => void) => void
}

const Modal = ({ createPlayGround, createFolder, createFile, deleteItem, editItem }: ModalProps) => {
  const modalFeatures = useContext(ModalContext);
  const [info, setInfo] = useState('');
  const { pointer } = useContext(DirectoryContext);

  useEffect(() => {
    if (modalFeatures.activateModal === 'delete' || modalFeatures.activateModal === 'edit') {
      setInfo(pointer.includes('_') ? pointer.split('_')[1] : pointer);
    }
  }, [modalFeatures.activateModal, pointer]);

  return (
    <>
      {
        (modalFeatures.activateModal === 'create' && createPlayGround) &&
        <CreatePlayGroundModal isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          createPlayGround={createPlayGround} />
      }
      {
        (modalFeatures.activateModal === 'create-file' && createFile) &&
        <CreateFileModal isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          createFile={createFile} />
      }
      {
        (modalFeatures.activateModal === 'create-folder' && createFolder) &&
        <CreateFolderModal isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          createFolder={createFolder} />
      }
      {modalFeatures.activateModal === 'edit' && (
        <EditModal
          isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          updateFolder={editItem}
          info={info}
          isFile={pointer.split('_').length==2}
        />
      )}

      {(modalFeatures.activateModal === 'delete' && deleteItem) &&
        <DeleteConfirm
          isModalOpen={true}
          closeModal={modalFeatures.closeModal}
          deleteOperation={deleteItem}
          info={info}
        />
      }
    </>
  );
};

export default Modal;